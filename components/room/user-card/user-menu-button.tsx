import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { kickUser } from '../../../libs/socket.io';
import { CurrentUser } from '../../../libs/types/room';
import { UserSession } from '../../../libs/types/user';

interface Props {
  user: UserSession | CurrentUser;
}

export default function UserMenuButton({ user }: Props) {
  const [{ roomInfo }] = useRoomContext();
  const { data: userSession } = useSession();

  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [userMenu, setUserMenu] = useState(false);

  const handleButtonClick = () => {
    setUserMenu(prev => !prev);
  };

  const handleKickButtonClick = () => {
    kickUser({
      roomId: roomInfo?.id,
      kickedUserId: user.userId,
      masterUserId: userSession?.id,
    });
    setUserMenu(false);
  };

  const onDocumentClick = (e: MouseEvent) => {
    if (userMenuButtonRef.current && userMenuRef.current) {
      if (
        !e.composedPath().includes(userMenuButtonRef.current) &&
        !e.composedPath().includes(userMenuRef.current)
      ) {
        setUserMenu(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  return (
    <div className="relative">
      <button ref={userMenuButtonRef} onClick={handleButtonClick}>
        <DotsHorizontalIcon className="w-4 2xl:w-6" />
      </button>
      <div
        ref={userMenuRef}
        className={`absolute top-[100%] right-0 translate-x-[35%] bg-gray-100 shadow-md rounded transition-opacity duration-300 flex w-fit h-fit flex-col p-4 ${
          userMenu ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        }`}
      >
        <button className="w-10" onClick={handleKickButtonClick}>
          강퇴
        </button>
      </div>
    </div>
  );
}
