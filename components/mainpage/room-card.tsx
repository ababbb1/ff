import Link from 'next/link';
import { RoomData } from '../../libs/types/room';

interface Props {
  roomInfo: RoomData;
}

export default function RoomCard({ roomInfo }: Props) {
  return (
    <div className="w-1/3 h-full">
      <div>{roomInfo.title}</div>
      <Link href={`/room/${roomInfo.id}/lobby`}>입장</Link>
    </div>
  );
}
