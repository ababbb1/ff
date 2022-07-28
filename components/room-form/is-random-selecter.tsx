import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import TriangleIcon from '../svg/room-form/triangle';
import { RoomFormData } from './room-form';

interface Props {
  setValue: UseFormSetValue<RoomFormData>;
  getValues: UseFormGetValues<RoomFormData>;
}

export default function IsRandomSelecter({ setValue, getValues }: Props) {
  return (
    <div className="bg-[#D9D9D9] w-full h-full relative p-4 2xl:p-6 disable-dragging">
      <div
        onClick={() =>
          setValue('isRandom', getValues('isRandom') === '1' ? '0' : '1')
        }
        className="absolute top-4 right-4 2xl:top-6 2xl:right-6 hover:cursor-pointer hover:animate-bounce"
      >
        <TriangleIcon className="w-4 h-4 2xl:w-5 2xl:h-5 rotate-90" />
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-semibold 2xl:text-2xl">역할 배정</span>

        <div className="relative">
          <div
            className={`absolute left-0 top-0 w-fit h-fit flex flex-col gap-1 transition-all duration-150 ${
              getValues('isRandom') === '0'
                ? 'opacity-100'
                : 'opacity-0 -translate-x-4 -z-10'
            }`}
          >
            <span className="font-hanson-bold text-2xl 2xl:text-3xl">Free</span>
            <p className="text-sm 2xl:text-base tracking-wide">
              자유롭게 배역을 선택해
              <br /> 플레이할 수 있습니다.
            </p>
          </div>

          <div
            className={`absolute left-0 top-0 w-fit h-fit flex flex-col gap-1 transition-all duration-150 ${
              getValues('isRandom') === '1'
                ? 'opacity-100'
                : 'opacity-0 -translate-x-4 -z-10'
            }`}
          >
            <span className="font-hanson-bold text-2xl 2xl:text-3xl">
              Random
            </span>
            <p className="text-sm 2xl:text-base tracking-wide">
              랜덤에 대한
              <br /> 설명.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
