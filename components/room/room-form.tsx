import 'swiper/css';
import 'swiper/css/navigation';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { cls } from '../../libs/utils';
import { EpisodeInfo, RoomData } from '../../libs/types/room';
import { EPISODES } from '../../libs/const';

interface Props {
  onValid: (data: RoomFormData) => void | unknown;
  onClose: () => void;
  initData?: RoomData;
  master: string;
  currentEpisode?: EpisodeInfo;
  isActive?: boolean;
}

export interface RoomFormData {
  title: string;
  password: string;
  episode: EpisodeInfo;
  hintTime: string;
  reasoningTime: string;
  master: string;
  isRandom: boolean;
}

export default function RoomForm({
  onValid,
  onClose,
  initData,
  master,
  currentEpisode,
  isActive = true,
}: Props) {
  const { register, handleSubmit, setValue, watch } = useForm<RoomFormData>({
    mode: 'onSubmit',
  });

  const handleValid = (data: RoomFormData) => {
    if (data.episode.title === 'Random') {
      const index = Math.round(Math.random() * (EPISODES.length - 2));
      data.episode = EPISODES[index];
    }
    onValid(data);
  };

  const onInvalid: SubmitErrorHandler<RoomFormData> = errors => {
    const errorsValues = Object.values(errors);
    alert(errorsValues.find(v => v.message)?.message);
  };

  useEffect(() => {
    setValue('title', initData?.title || '');
    setValue('password', initData?.password || '');
    setValue('hintTime', initData?.hintTime || '');
    setValue('reasoningTime', initData?.reasoningTime || '');
    setValue('master', master || '');
    setValue('isRandom', initData?.isRandom === '1');
  }, []);

  useEffect(() => {
    if (currentEpisode) {
      setValue('episode', currentEpisode);
    }
  }, [currentEpisode, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handleValid, onInvalid)}
      className={`w-full h-full flex flex-col lg:flex-row absolute top-0 left-0 transition-all duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0 translate-y-[4%] -z-10'
      }`}
    >
      <div className="bg-blue-300 w-full h-full">
        <div onClick={onClose} className="text-white">
          닫기
        </div>
        <input
          {...register('title', {
            required: '제목을 입력해주세요.',
          })}
          placeholder="title"
          type="text"
          className={`${cls('w-full h-12 border rounded-md p-2')}`}
          autoComplete="off"
        />
        <input
          {...register('password')}
          placeholder="password"
          type="password"
          className={`${cls('w-full h-12 border rounded-md p-2')}`}
          autoComplete="off"
        />

        <span>{watch('episode')?.title}</span>

        <input
          {...register('hintTime', {
            required: '조사시간을 선택해주세요.',
            validate: {
              lessThan: v => parseInt(v) < 60 || '60이하의 숫자만 가능합니다.',
            },
          })}
          type="text"
          className={`${cls('w-full h-12 border rounded-md p-2')}`}
        />

        <input
          {...register('reasoningTime', {
            required: '추리시간을 선택해주세요.',
            validate: {
              lessThan: v => parseInt(v) < 60 || '60이하의 숫자만 가능합니다.',
            },
          })}
          type="text"
          className={`${cls('w-full h-12 border rounded-md p-2')}`}
        />

        <div className="flex justify-center">
          <div className="form-check form-switch">
            <input
              {...register('isRandom')}
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
            />
          </div>
        </div>

        <button type="submit">방만들기</button>
      </div>
    </form>
  );
}
