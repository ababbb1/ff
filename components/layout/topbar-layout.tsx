import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { exitRoom } from '../../libs/socket.io';
import { splitByColon } from '../../libs/utils';
import { RoomData } from '../../libs/types/room';
import { UserSession } from '../../libs/types/user';

interface Props extends PropsWithChildren {
  user: UserSession;
  roomInfo: RoomData;
}

export default function TopbarLayout({ children, user, roomInfo }: Props) {
  const router = useRouter();

  const handleExitButton = () => {
    exitRoom({ roomId: roomInfo?.id, userId: user.id });
    router.back();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white py-[1rem] px-[1.5rem] flex justify-between h-[8%] top-0 w-full">
        <div className="h-full">
          <img
            src="/assets/logo-black-sm.png"
            alt="topbar-logo"
            style={{ height: '100%' }}
          />
        </div>
        <div className="h-full flex items-center gap-6">
          <div className="flex h-full items-center gap-2">
            <div className="h-[2rem]">
              <img
                src="/assets/dummy-profile.png"
                alt="dummy-profile"
                style={{ height: '100%' }}
              />
            </div>
            <span className="font-semibold">
              {splitByColon(user.nickname, 'name')}
            </span>
          </div>
          <button onClick={handleExitButton}>나가기</button>
        </div>
      </div>
      <div className="h-[92%] border-2 border-black">{children}</div>
    </div>
  );
}
