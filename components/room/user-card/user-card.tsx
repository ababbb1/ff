import { ChevronDownIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { CurrentUser } from '../../../libs/types/room';
import Mic from '../../svg/lobby/mic';
import VideoIcon from '../../svg/lobby/video';
import StarIcon from '../../svg/lobby/star';
import VideochatIcon from '../../svg/lobby/video-chat';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { useRef } from 'react';
import { kickUser } from '../../../libs/socket.io';
import TriangleIcon from '../../svg/room-form/triangle';
import usePopup from '../../../libs/hooks/room/usePopup';
import { Session } from 'next-auth';

interface Props {
  user: Session | CurrentUser;
  userStream?: MediaStream;
}

export default function UserCard({ user, userStream }: Props) {
  const { data: userSession } = useSession();

  const [{ roomInfo, currentUsers, myStreamInfo }] = useRoomContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    popupButtonRef,
    popupRef,
    isActive,
    setIsActive,
    handleClickPopupButton,
  } = usePopup();

  const isMe = user.userId === userSession?.userId;
  const amIMaster = userSession?.nickname === roomInfo?.master;
  const isMaster = user.nickname === roomInfo?.master;
  const currentUsersOfMe = currentUsers.find(
    cUser => cUser.userId === userSession?.userId,
  );
  const currentUserNumber = currentUsers
    .map((cUser, index) => ({
      id: cUser.userId,
      index,
    }))
    .find(v => v.id === user.userId)?.index;

  const handleClickKickButton = () => {
    kickUser({
      roomId: roomInfo?.id,
      kickedUserId: user.userId,
      masterUserId: userSession?.userId,
    });
    setIsActive(false);
  };

  useUpdateEffect(() => {
    if (videoRef.current) {
      if (userStream) {
        videoRef.current.srcObject = userStream;
      } else if (myStreamInfo.stream && isMe) {
        videoRef.current.srcObject = myStreamInfo.stream;
      }
    }
  }, [myStreamInfo]);

  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full bg-[#000000b2] relative">
        {myStreamInfo.stream ? (
          <video
            className="absolute w-full h-full object-cover border-2 border-black rounded"
            ref={videoRef}
            autoPlay
            playsInline
            preload="auto"
            muted={isMe}
            style={{ transform: 'rotateY(180deg)' }}
          />
        ) : null}
      </div>

      <div className="h-full aspect-square flex flex-col">
        <div className="w-full h-1/3 border-b-2 border-black flex">
          {(isMe && myStreamInfo.stream) || !isMe ? (
            <>
              <div
                className={`grow h-full border-r-2 border-black last:border-r-0 flex justify-center items-center ${
                  isMe ? 'hover:cursor-pointer' : ''
                }`}
              >
                <div
                  className={`w-full h-full flex justify-center items-center ${
                    isMe ? 'hover:bg-black hover:text-white' : ''
                  }`}
                >
                  <VideoIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
                </div>
                {isMe ? (
                  <div className="bg-[#000000b2] w-full max-w-[30%] h-full flex items-center justify-center">
                    <ChevronDownIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" />
                  </div>
                ) : null}
              </div>

              <div
                className={`grow h-full border-r-2 border-black last:border-r-0 flex justify-center items-center ${
                  isMe ? 'hover:cursor-pointer' : ''
                }`}
              >
                <div
                  className={`w-full h-full flex justify-center items-center ${
                    isMe ? 'hover:bg-black hover:text-white' : ''
                  }`}
                >
                  <Mic className="w-5 h-5 2xl:w-6 2xl:h-6" />
                </div>
                {isMe ? (
                  <div className="bg-[#000000b2] w-full h-full max-w-[30%] flex items-center justify-center">
                    <ChevronDownIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" />
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <div
              onClick={() => alert('화상 채팅은 아직 준비중인 기능입니다.')}
              className="w-full h-full flex justify-center items-center 2xl:text-base hover:cursor-pointer hover:text-white hover:bg-[#000000b2]"
            >
              <VideochatIcon className="w-8 h-8 2xl:w-10 2xl:h-10" />
            </div>
          )}

          {!isMe ? (
            <div
              className={`grow h-full border-r-2 border-black last:border-r-0 flex justify-center items-center relative`}
            >
              {amIMaster ? (
                <>
                  <div
                    ref={popupButtonRef}
                    onClick={handleClickPopupButton}
                    className="w-full h-full flex justify-center items-center hover:cursor-pointer hover:bg-black hover:text-white"
                  >
                    <DotsHorizontalIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
                  </div>
                  <TriangleIcon
                    className={`absolute top-[100%] left-[50%] translate-y-1 -translate-x-[50%] text-black shadow-md transition-opacity duration-100 w-4 h-4 ${
                      isActive ? 'opacity-100 z-20' : 'opacity-0 -z-10'
                    }`}
                  />
                  <div
                    ref={popupRef}
                    className={`absolute top-[100%] left-0 translate-y-4 -translate-x-[27%] 2xl:-translate-x-[20%] bg-black text-white shadow-md rounded transition-opacity duration-100 flex w-fit h-fit flex-col py-2 px-4 ${
                      isActive ? 'opacity-100 z-20' : 'opacity-0 -z-10'
                    }`}
                  >
                    <button
                      className="whitespace-nowrap hover:cursor-pointer p-1 w-18 2xl:w-20"
                      onClick={handleClickKickButton}
                    >
                      추방하기
                    </button>
                  </div>
                </>
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
                : 'opacity-0 -z-10'
            }`}
          ></div>
          <div className="flex justify-between z-10">
            <span className="font-hanson-bold text-xl 2xl:text-3xl">
              0
              {typeof currentUserNumber === 'number'
                ? currentUserNumber + 1
                : 0}
            </span>
            {isMaster ? (
              <StarIcon className="w-4 h-4 2xl:w-5 2xl:h-5 text-black" />
            ) : null}
          </div>
          <div className="flex justify-between items-center h-fit z-10">
            <span className="font-bold 2xl:text-xl">캐릭터 이름</span>
          </div>
        </div>
      </div>
    </div>
  );
}
