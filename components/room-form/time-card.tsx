import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import TriangleIcon from '../svg/room-form/triangle';
import { RoomFormData } from './room-form';

interface Props {
  kind: 'hintTime' | 'reasoningTime';
  difficulty: 'Easy' | 'Hard';
  description: string;
  register: UseFormRegisterReturn;
  watch: UseFormWatch<RoomFormData>;
  setValue: UseFormSetValue<RoomFormData>;
}

export default function TimeCard({
  kind,
  difficulty,
  description,
  register,
  watch,
  setValue,
}: Props) {
  const handleIncreaseButton = () => {
    if (+watch(kind) < 30) {
      setValue(kind, `${+watch(kind) + 1}`);
    }
  };
  const handleDecreaseButton = () => {
    if (+watch(kind) > 10) {
      setValue(kind, `${+watch(kind) - 1}`);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div
        className={`w-full h-full bg-note-sm bg-cover bg-no-repeat p-4 2xl:p-6 relative ${
          difficulty === 'Easy' ? 'text-black' : 'text-white'
        }`}
      >
        {difficulty === 'Hard' && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000f4] via-[#000000af] to-[#00000038]"></div>
        )}
        <div className="w-full h-full flex flex-col justify-between relative z-10">
          <div className="flex flex-col gap-1 pr-6 2xl:pr-8">
            <span>{kind === 'hintTime' ? '조사시간' : '추리시간'}</span>
            <span
              className={`font-hanson-bold text-3xl ${
                difficulty === 'Easy' ? 'mt-1 mb-2' : 'my-2'
              }`}
            >
              {difficulty}
            </span>
            <p>{description}</p>
          </div>
          <div className="flex justify-end">
            <input
              {...register}
              type="text"
              maxLength={2}
              className="font-hanson-bold text-3xl bg-transparent border-none focus:outline-none w-[4rem] text-right"
              autoComplete="off"
            />
            <span className="font-hanson-bold text-3xl">:00</span>
          </div>
        </div>
      </div>
      <div className="w-[3.5rem] 2xl:w-[4.5rem] h-full border-l-2 border-black bg-white flex flex-col justify-end">
        <div
          onClick={handleIncreaseButton}
          className="w-full aspect-square border-t border-black flex justify-center items-center hover:cursor-pointer hover:bg-black hover:text-white"
        >
          <TriangleIcon className="w-4 h-4 2xl:w-5 2xl:h-5" />
        </div>
        <div
          onClick={handleDecreaseButton}
          className="w-full aspect-square border-t border-black flex justify-center items-center hover:cursor-pointer hover:bg-black hover:text-white"
        >
          <TriangleIcon className="w-4 h-4 2xl:w-5 2xl:h-5 rotate-180" />
        </div>
      </div>
    </div>
  );
}
