import { useState } from 'react';
import { RoomData } from '../../libs/types/room';
import { UserSession } from '../../libs/types/user';
import LoadingScreen from '../loading-screen';
import RoomSearchForm from './room-search-form';
import RoomSearchResult from './room-search-result';

export interface RoomSearchApiResponse {
  success: boolean;
  roomList: RoomData[];
}

export default function RoomSearch({ user }: { user: UserSession }) {
  const [searchResult, setSearchResult] = useState<RoomSearchApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="w-50 bg-white">
      <RoomSearchForm {...{ user, setSearchResult, setIsLoading }} />
      <div className="relative">
        {isLoading ? (
          <LoadingScreen isFull={false} />
        ) : (
          <RoomSearchResult {...{ searchResult }} />
        )}
      </div>
    </div>
  );
}
