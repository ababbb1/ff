import { XIcon } from '@heroicons/react/outline';
import { Dispatch, SetStateAction, useState } from 'react';
import useToggle from '../../../libs/hooks/useToggle';
import { RoomData } from '../../../libs/types/room';
import LoadingScreen from '../../loading-screen';
import RoomSearchForm from './room-search-form';
import RoomSearchResult from './room-search-result';

export interface RoomSearchApiResponse {
  success: boolean;
  roomList: RoomData[];
}

interface Props {
  setSearchModal: Dispatch<SetStateAction<boolean>>;
}

export default function RoomSearch({ setSearchModal }: Props) {
  const [searchResult, setSearchResult] = useState<RoomSearchApiResponse>();
  const [isLoading, toggleIsLoading] = useToggle();

  return (
    <div className="w-[60vw] flex flex-col gap-3">
      <div className="w-full flex flex-col">
        <div className="w-full h-10 flex justify-between items-center border-b-2 border-black bg-white">
          <div className="h-full aspect-square opacity-0"></div>
          <div className="grow flex justify-center">
            <span className="font-semibold">방찾기</span>
          </div>
          <div
            onClick={() => setSearchModal(false)}
            className="h-full flex justify-center items-center aspect-square border-l-2 border-black text-black hover:cursor-pointer hover:bg-black hover:text-white"
          >
            <XIcon className="w-6 h-6" />
          </div>
        </div>
        <RoomSearchForm {...{ setSearchResult, toggleIsLoading }} />
      </div>
      <div className="relative">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <RoomSearchResult {...{ searchResult }} />
        )}
      </div>
    </div>
  );
}
