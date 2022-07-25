import { Session } from 'next-auth';
import { useRef } from 'react';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { CurrentUser } from '../../../libs/types/room';
import { splitByColon } from '../../../libs/utils';
import YellowStar from '../../svg/lobby/yellow-star';
import { useSession } from 'next-auth/react';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import UserMenuButton from './user-menu-button';

interface Props {
  isMe?: boolean;
  isMaster?: boolean;
  user: Session | CurrentUser;
  stream: MediaStream | null;
  buttons?: JSX.Element[];
}

export default function UserCard({
  isMe = false,
  isMaster = false,
  user,
  stream,
  buttons,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [{ roomInfo }] = useRoomContext();
  const { data: userSession } = useSession();
  const amIMaster = userSession?.nickname === roomInfo?.master;

  useUpdateEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-full h-full flex gap-4">
      <div className="h-full aspect-square bg-black relative rounded">
        <video
          className="absolute w-full h-full object-cover border-2 border-black rounded"
          ref={videoRef}
          autoPlay
          playsInline
          preload="auto"
          // muted={isMe}
          muted
          style={{ transform: 'rotateY(180deg)' }}
        />
      </div>
      <div className="h-full w-full flex flex-col justify-between py-1">
        <div className="flex flex-col gap-2 2xl:gap-3">
          <div className="flex justify-between w-full h-4 2xl:h-6">
            <span className="font-semibold text-xl 2xl:text-3xl flex h-full items-center">
              {splitByColon(user.nickname as string, 'name')}
            </span>
            {isMaster ? (
              <YellowStar className="w-4 2xl:w-6" />
            ) : !isMe && amIMaster ? (
              <UserMenuButton user={user} />
            ) : null}
          </div>
          <div className="flex">
            <span className="2xl:text-2xl font-bold">캐릭터명</span>
          </div>
        </div>

        <div className="w-full flex justify-end gap-1">{buttons}</div>
      </div>
    </div>
  );
}