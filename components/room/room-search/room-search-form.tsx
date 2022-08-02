import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import API, { authHeaders } from '../../../libs/api';
import { cls } from '../../../libs/utils';
import { ToggleHandler } from '../../../libs/hooks/useToggle';
import { RoomSearchApiResponse } from './room-search';
import { useSession } from 'next-auth/react';
import MagnifyingGlassIcon from '../../svg/mainpage/magnifying-glass';

interface Props {
  setSearchResult: Dispatch<SetStateAction<RoomSearchApiResponse | undefined>>;
  toggleIsLoading: ToggleHandler;
}

export interface SearchFormData {
  inputValue: string;
  type: 'TITLE' | 'NICKNAME';
}

export default function RoomSearchForm({
  setSearchResult,
  toggleIsLoading,
}: Props) {
  const { data: userSession } = useSession();

  const { register, handleSubmit } = useForm<SearchFormData>({
    mode: 'onSubmit',
  });

  const onValid = async (params: SearchFormData) => {
    if (userSession?.token) {
      toggleIsLoading(true);
      const res = await API.get('room/search', {
        params,
        headers: authHeaders(userSession.token),
      });
      setSearchResult(res.data.result);
      toggleIsLoading(false);
    }
  };

  return (
    <div className="w-full h-14 bg-white">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex items-center w-full h-full"
      >
        <div className="flex justify-center w-[20%] h-full border-r-2 border-black px-2">
          <select
            {...register('type')}
            className="w-full focus:outline-none px-2"
          >
            <option value="TITLE" defaultChecked>
              방 제목
            </option>
            <option value="NICKNAME">방장</option>
          </select>
        </div>
        <div className="w-full h-full flex gap-1">
          <input
            {...register('inputValue', {
              required: '검색 키워드를 입력해주세요.',
            })}
            placeholder="방장 닉네임 또는 방 제목을 입력해주세요."
            type="text"
            className={cls(
              'w-full h-full focus:outline-none bg-[#d4d4d4] px-4',
            )}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="h-full aspect-square flex justify-center items-center border-l-2 border-black"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
