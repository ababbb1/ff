import { useState } from 'react';
import { RoomData, UserSession } from '../../libs/types/user';
import RoomSearchForm from './room-search-form';
import RoomSearchResult from './room-search-result';

export default function RoomSearch({ user }: { user: UserSession }) {
  const [searchResultList, setSearchResultList] = useState<RoomData[]>([]);

  return (
    <div className="w-50 bg-white">
      <RoomSearchForm {...{ user, setSearchResultList }} />
      <RoomSearchResult {...{ searchResultList }} />
    </div>
  );
}
