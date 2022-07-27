import { useState } from 'react';
import useToggle from '../../../libs/hooks/useToggle';
import { RoomData } from '../../../libs/types/room';
import LoadingScreen from '../../loading-screen';
import RoomSearchForm from './room-search-form';
import RoomSearchResult from './room-search-result';

export interface RoomSearchApiResponse {
  success: boolean;
  roomList: RoomData[];
}

export default function RoomSearch() {
  const [searchResult, setSearchResult] = useState<RoomSearchApiResponse>();
  const [isLoading, toggleIsLoading] = useToggle();

  return (
    <div className="w-50 bg-white">
      <RoomSearchForm {...{ setSearchResult, toggleIsLoading }} />
      <div className="relative">
        {isLoading ? (
          <LoadingScreen fullScreen />
        ) : (
          <RoomSearchResult {...{ searchResult }} />
        )}
      </div>
    </div>
  );
}
