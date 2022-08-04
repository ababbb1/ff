import { ClockIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { RoomData } from '../../libs/types/room';
import { splitByColon } from '../../libs/utils';
import RoomCardLockBackground from '../svg/mainpage/room-card-lock-background';
import LockClosedIcon from '../svg/room-form/lock-closed';
import LockOpenIcon from '../svg/room-form/lock-open';
import { ModalPasswordValidateProps } from './room-list';

interface Props {
  roomData: RoomData;
  setIsModalActive: Dispatch<SetStateAction<ModalPasswordValidateProps>>;
  index: number;
}

export default function RoomCard({ roomData, setIsModalActive, index }: Props) {
  const { data: userSession } = useSession();
  const router = useRouter();
  const isProgress = roomData.roomState !== 'standby';
  const bgImage =
    (index + 1) % 3 === 0
      ? 'bg-room-card3'
      : (index + 1) % 2 === 0
      ? 'bg-room-card2'
      : 'bg-room-card1';

  const handleStartButton = () => {
    if (userSession) {
      const banUserIdList = roomData.banUsers.split(',');
      const amIbaned = banUserIdList.find(id => +id === userSession.userId);

      if (amIbaned) {
        alert('강퇴당한 방에 입장할 수 없습니다.');
        return;
      }

      if (roomData.password) {
        setIsModalActive({
          roomData,
          isActive: true,
        });
        return;
      }
      router.push(`/room/${roomData.id}/lobby`);
    }
  };

  return (
    <>
      <div
        className={`h-full flex flex-col ${bgImage} bg-cover
        ${bgImage === 'bg-room-card3' ? 'text-black' : 'text-white'}`}
      >
        <div className="w-full h-full flex flex-col justify-between p-6 2xl:p-8">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-1 w-[12rem] 2xl:w-[16rem]">
              <span className="text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                {splitByColon(roomData.master, 'name')}
              </span>
              <span className="text-2xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                {roomData.title}
              </span>
            </div>
            <div className="">
              {roomData.password ? (
                <div className="w-10 2xl:w-12 h-10 2xl:h-12 relative">
                  <RoomCardLockBackground className="w-full h-full" />
                  <LockClosedIcon className="text-black w-3 h-3 2xl:w-4 2xl:h-4 absolute z-[1] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
                </div>
              ) : (
                <div className="w-10 2xl:w-12 h-10 2xl:h-12 relative">
                  <RoomCardLockBackground className="w-full h-full" />
                  <LockOpenIcon className="text-black w-3 h-3 2xl:w-4 2xl:h-4 absolute z-[1] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
                <span className="2xl:text-xl">{roomData.hintTime}:00</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
                <span className="2xl:text-xl">{roomData.reasoningTime}:00</span>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-1">
              <div className="flex justify-end w-full">
                <div
                  className={`w-[4.7rem] pr-3 h-7 rounded-full border flex items-center justify-between gap-1 ${
                    bgImage === 'bg-room-card3'
                      ? 'border-black'
                      : 'border-white'
                  } ${roomData.count === 5 ? 'text-red-600' : ''}`}
                >
                  <div
                    className={`w-[70%] h-full border-r rounded-xl flex justify-center items-center ${
                      bgImage === 'bg-room-card3'
                        ? 'border-black'
                        : 'border-white'
                    }`}
                  >
                    <span>{roomData.count}</span>
                  </div>
                  <span>5</span>
                </div>
              </div>
              <span className="text-right font-semibold 2xl:text-xl">
                {roomData.isRandom === '1' ? 'RANDOM' : 'FREE'}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-20 2xl:h-24 border-t-2 ${
            bgImage !== 'bg-room-card3' ? 'border-white' : 'border-black'
          }`}
        >
          {isProgress ? (
            <div className="w-full h-full font-hanson-bold flex justify-center items-center 2xl:text-2xl">
              Game in progress
            </div>
          ) : (
            <button
              onClick={handleStartButton}
              className="w-full h-full font-hanson-bold text-xl 2xl:text-2xl hover:bg-[#00000076]"
            >
              Game Start
            </button>
          )}
        </div>
      </div>
    </>
  );
}
