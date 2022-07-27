import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { exitRoom } from '../../libs/socket.io';
import { splitByColon } from '../../libs/utils';
import { XIcon } from '@heroicons/react/outline';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { useSession } from 'next-auth/react';

type Props = PropsWithChildren;

export default function TopbarLayout({ children }: Props) {
  const router = useRouter();
  const { data: userSession } = useSession();
  const [{ roomInfo }] = useRoomContext();

  const handleExitButton = () => {
    exitRoom({ roomId: roomInfo?.id, userId: userSession?.userId });
    router.back();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-[1rem] px-[1.5rem] flex justify-between h-[8%] top-0 w-full">
        <div className="h-full">
          <img
            src="/assets/logo-black-sm.webp"
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
              {userSession?.nickname
                ? splitByColon(userSession.nickname, 'name')
                : ''}
            </span>
          </div>
          <button onClick={handleExitButton}>
            <XIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </button>
        </div>
      </div>
      <div className="h-[92%] border-2 border-black">{children}</div>
    </div>
  );
}
