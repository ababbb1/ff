import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { cls } from '../libs/client/utils';

export interface SearchFormData {
  value: string;
  type: 'title' | 'nickname';
}

export default function RoomSearchForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SearchFormData>({
    mode: 'onSubmit',
  });

  const onValid: SubmitHandler<SearchFormData> = (data: SearchFormData) => {
    console.log(data);
    router.back();
  };

  return (
    <div className="w-full justify-center items-center h-screen flex">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col items-center h-screen gap-4 px-4 pt-24 w-full max-w-sm"
      >
        <div className="w-full flex flex-col gap-1">
          <input
            {...register('value', {
              required: '검색 키워드를 입력해주세요.',
            })}
            placeholder="방장 닉네임 또는 방 제목"
            type="text"
            className={cls('w-full h-12 border rounded-md p-2')}
          />
        </div>

        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <select
              {...register('type')}
              className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
            >
              <option value="title" defaultChecked>
                방 제목
              </option>
              <option value="nickname">방장</option>
            </select>
          </div>
        </div>

        <button type="submit">찾기</button>
      </form>
    </div>
  );
}
