import { ClockIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { RoomData } from '../../libs/types/room';
import { splitByColon } from '../../libs/utils';
import LockClosedIcon from '../svg/room-form/lock-closed';
import LockOpenIcon from '../svg/room-form/lock-open';
import { ModalPasswordValidateProps } from './room-list';

interface Props {
  roomData: RoomData;
  setIsModalActive: Dispatch<SetStateAction<ModalPasswordValidateProps>>;
}

export default function RoomCard({ roomData, setIsModalActive }: Props) {
  const router = useRouter();
  const isProgress = roomData.roomState !== 'standby';

  const handleStartButton = () => {
    if (roomData.password) {
      setIsModalActive({
        roomData,
        isActive: true,
      });
      return;
    }
    router.push(`/room/${roomData.id}/lobby`);
  };

  return (
    <>
      <div
        className={`h-full flex flex-col ${
          isProgress ? 'bg-[#D2D2D2]' : 'bg-room-card bg-cover text-white'
        }`}
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
            <div className="pt-2">
              {roomData.password ? (
                <LockClosedIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
              ) : (
                <LockOpenIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
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
            <div className="flex flex-col justify-end">
              <span
                className={`text-right ${
                  roomData.count === 5 ? 'text-red-600' : ''
                }`}
              >
                {roomData.count}/5
              </span>
              <span className="text-right">
                {roomData.isRandom === '1' ? '랜덤' : '자유'}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-20 2xl:h-24 border-t-2 ${
            isProgress ? 'border-black' : 'border-white'
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
