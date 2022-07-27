import Link from 'next/link';
import { RoomData } from '../../libs/types/room';
import { RoomSearchApiResponse } from './room-search';

export default function RoomSearchResult({
  searchResult,
}: {
  searchResult?: RoomSearchApiResponse;
}) {
  return (
    <div>
      {searchResult?.roomList.length ? (
        <ul>
          {searchResult.roomList?.map((v: RoomData) => (
            <li key={`room${v.id}`} className="w-full h-20 bg-red-300">
              <span>{v.title}</span>
              <Link href={`/room/${v.id}/lobby`}>입장</Link>
            </li>
          ))}
        </ul>
      ) : (
        searchResult && <span>검색 결과가 없습니다.</span>
      )}
    </div>
  );
}
