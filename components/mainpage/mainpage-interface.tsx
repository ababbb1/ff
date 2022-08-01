import Link from 'next/link';
import { splitByColon } from '../../libs/utils';
import { RoomData } from '../../libs/types/room';
import RoomList from './room-list';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import LoadingScreen from '../loading-screen';

interface Props {
  roomList: RoomData[];
  searchButtonHandler: () => void;
}

export default function MainpageInterface({
  roomList,
  searchButtonHandler,
}: Props) {
  const { data: userSession } = useSession();

  const [bgLoaded, setBgLoaded] = useState(false);

  if (!bgLoaded) return <LoadingScreen fullScreen />;

  return (
    <div
      onLoad={() => setBgLoaded(true)}
      className="w-full h-full bg-crumpled-paper bg-cover flex flex-col border-b-2 border-black"
    >
      <div className="flex max-h-[20%]">
        <div className="w-1/3 border-l-2 border-r border-b rounded-br-2xl border-black">
          <div className="flex h-full gap-4 px-6 py-4">
            <div className="h-full flex items-center">
              <div className="w-14 h-14  rounded-full">
                <img src="/assets/dummy-profile.png" alt="dummy-profile" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm">유저</span>
              <div className="font-bold text-xl">
                {userSession?.nickname
                  ? splitByColon(userSession.nickname, 'name')
                  : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 border-l border-b rounded-bl-2xl border-black">
          <button
            onClick={searchButtonHandler}
            className="w-full h-full flex flex-col justify-center px-6 py-4 relative"
          >
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black opacity-20 rounded-bl-2xl"></div>
            <span className="text-sm text-left">방 찾기</span>
            <span className="font-hanson-bold text-xl flex items-center pt-1">
              Find a room
            </span>
          </button>
        </div>
        <div className="w-1/3 border-r-2 border-l-2 border-b border-black hover:cursor-pointer">
          <Link href={'/room/create'}>
            <div className="w-full h-full flex flex-col justify-center px-6 py-4 relative">
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black opacity-20"></div>
              <span className="text-sm text-left">방 만들기</span>
              <span className="font-hanson-bold text-xl flex items-center pt-1">
                Making a room
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full h-full flex">
        <div className="w-1/3 h-full border-l-2 border-t border-r rounded-tr-2xl border-black">
          <Link href={'/mypage'}>마이페이지</Link>
        </div>
        <div className="w-2/3 h-full border-l border-r-2 border-t rounded-tl-2xl border-black">
          <RoomList {...{ roomList }} />
        </div>
      </div>
    </div>
  );
}
