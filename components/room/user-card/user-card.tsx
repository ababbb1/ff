import { ChevronDownIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { CurrentUser } from '../../../libs/types/room';
import { UserSession } from '../../../libs/types/user';
import Mic from '../../svg/lobby/mic';
import Video from '../../svg/lobby/video';
import Star from '../../svg/lobby/star';

interface Props {
  user: UserSession | CurrentUser;
}

export default function UserCard({ user }: Props) {
  const { data } = useSession();
  const userSession = data as UserSession;

  const [{ roomInfo, currentUsers }] = useRoomContext();

  const isMe = user.id === userSession.id;
  const amIMaster = userSession.nickname === roomInfo?.master;
  const isMaster = user.nickname === roomInfo?.master;
  const currentUsersOfMe = currentUsers.find(
    cUser => cUser.id === userSession.id,
  );
  const currentUserNumber = currentUsers
    .map((cUser, index) => ({
      id: cUser.id,
      index,
    }))
    .find(v => v.id === user.id)?.index;

  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full bg-[#000000b2]"></div>

      <div className="h-full aspect-square border-l-2 border-black flex flex-col">
        <div className="w-full h-1/3 border-b-2 border-black flex">
          {/* video-button */}
          <div
            className={`grow h-full border-r-2 border-black last:border-r-0 flex justify-center items-center ${
              isMe ? 'hover:cursor-pointer' : ''
            }`}
          >
            <div
              className={`w-full h-full flex justify-center items-center aspect-square`}
            >
              <Video className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </div>
            {isMe ? (
              <div className="bg-[#000000b2] w-full h-full flex items-center justify-center">
                <ChevronDownIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" />
              </div>
            ) : null}
          </div>

          {/* audio-button */}
          <div
            className={`grow h-full border-r-2 border-black last:border-r-0 flex justify-center items-center ${
              isMe ? 'hover:cursor-pointer' : ''
            }`}
          >
            <div
              className={`w-full h-full flex justify-center items-center aspect-square`}
            >
              <Mic className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </div>
            {isMe ? (
              <div className="bg-[#000000b2] w-full h-full flex items-center justify-center">
                <ChevronDownIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" />
              </div>
            ) : null}
          </div>

          {!isMe ? (
            <div
              className={`grow h-full border-r-2 border-black last:border-r-0 flex justify-center items-center ${
                amIMaster
                  ? 'hover:cursor-pointer hover:bg-black hover:text-white'
                  : ''
              }`}
            >
              {amIMaster ? (
                <DotsHorizontalIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
              ) : (
                <div className="w-full h-full bg-[#000000b2]">
                  <div className="w-5 h-5 2xl:w-6 2xl:h-6" />
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div
          className={`w-full h-2/3 flex flex-col justify-between p-2 relative`}
        >
          <div
            className={`absolute w-full h-full top-0 left-0 flex justify-center items-center text-[#2c2c2c22] text-base 2xl:text-xl font-hanson-bold transition-all duration-300 ${
              (user.readyState && !isMaster) ||
              (currentUsersOfMe?.readyState && !amIMaster && isMe)
                ? 'opacity-100 bg-animate-layout-border'
                : 'opacity-0'
            }`}
          >
            Ready
          </div>
          <div className="flex justify-between z-10">
            <span className="font-hanson-bold text-xl 2xl:text-3xl">
              0{currentUserNumber ? currentUserNumber + 1 : 0}
            </span>
            {isMaster ? (
              <Star className="w-4 h-4 2xl:w-5 2xl:h-5 text-black" />
            ) : null}
          </div>
          <div className="flex z-10">
            <span className="font-bold 2xl:text-xl">캐릭터 이름</span>
          </div>
        </div>
      </div>
    </div>
  );
}
