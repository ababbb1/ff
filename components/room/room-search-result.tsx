import Link from 'next/link';
import { RoomData } from '../../libs/types/user';

export default function RoomSearchResult({
  searchResultList,
}: {
  searchResultList?: RoomData[];
}) {
  return (
    <div>
      <ul>
        {searchResultList?.map((v: RoomData) => (
          <li key={`room${v.id}`} className="w-full h-20 bg-red-300">
            <span>{v.title}</span>
            <Link href={`/room/${v.id}/lobby`}>입장</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
