import 'swiper/css';
import 'swiper/css/navigation';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { cls, roomPasswordCheck } from '../../libs/utils';
import { RoomData } from '../../libs/types/room';
import { EPISODES } from '../../libs/const';
import { XIcon } from '@heroicons/react/outline';
import TimeCard from './time-card';
import useToggle from '../../libs/hooks/useToggle';
import LockClosed from '../svg/room-form/lock-closed';
import LockOpen from '../svg/room-form/lock-open';
import CheckIcon from '../svg/room-form/check';
import IsRandomSelecter from './is-random-selecter';
import { EpisodeInfo } from '../../libs/types/game';

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
  isRandom: '0' | '1';
}

const difficultyDescriptions = {
  hintTime: {
    easy: '단서를 획득할 시간이 충분합니다.',
    hard: '조사 시간이 부족해 범인 단서 획득에 어려움이 있습니다.',
  },
  reasoningTime: {
    easy: '단서들을 분석하여 범인을 추리할 시간이 충분합니다.',
    hard: '추리 시간이 부족해 단서들을 분석하고 범인을 찾기가 어려워집니다.',
  },
};

export default function RoomForm({
  onValid,
  onClose,
  initData,
  master,
  currentEpisode,
  isActive = true,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RoomFormData>({
    mode: 'onChange',
  });

  const [isPrivate, toggleIsPrivate] = useToggle();

  const sumofTime = +watch('hintTime') + +watch('reasoningTime');

  const handleValid = (data: RoomFormData) => {
    if (data.episode.title === 'Random') {
      const index = Math.round(Math.random() * (EPISODES.length - 2));
      data.episode = EPISODES[index];
    }
    //onValid({ ...data, hintTime: '3', reasoningTime: '0.5' });
    onValid(data);
  };

  const onInvalid: SubmitErrorHandler<RoomFormData> = errors => {
    const errorsValues = Object.values(errors);
    alert(errorsValues.find(v => v.message)?.message);
  };

  useEffect(() => {
    setValue('title', initData?.title || '');
    setValue('password', initData?.password || '');
    setValue('hintTime', initData?.hintTime || '10');
    setValue('reasoningTime', initData?.reasoningTime || '10');
    setValue('master', master || '');
    setValue('isRandom', initData?.isRandom || '0');
  }, []);

  useEffect(() => {
    if (currentEpisode) {
      setValue('episode', currentEpisode);
    }
  }, [currentEpisode, setValue]);

  useEffect(() => {
    if (!isPrivate) {
      setValue('password', '');
    }
  }, [isPrivate, setValue]);

  useEffect(() => {
    // eslint-disable-next-line
    const regExp = /^[5-9]*$|^[1][0-9]*$|^[2][0]*$/;
    if (!regExp.test(watch('hintTime')) && watch('hintTime') !== '') {
      setValue('hintTime', '10');
    }
    if (!regExp.test(watch('reasoningTime')) && watch('reasoningTime') !== '') {
      setValue('reasoningTime', '10');
    }
  }, [setValue, watch('hintTime'), watch('reasoningTime')]);

  return (
    <form
      onSubmit={handleSubmit(handleValid, onInvalid)}
      className={`disable-dragging w-full h-full flex flex-col lg:flex-row absolute top-0 left-0 transition-all duration-300 ${
        isActive ? 'opacity-100 z-30' : 'opacity-0 translate-y-[4%] -z-10'
      }`}
    >
      <div
        className={`bg-crumpled-paper bg-cover w-full h-full flex flex-col ${
          initData ? '' : 'border-2 border-black'
        }`}
      >
        <div className="w-full flex justify-between items-center px-4 grow">
          <div className="w-5 h-5 2xl:w-7 2xl:h-7" />
          <span className="text-xl 2xl:text-2xl font-semibold">
            {initData ? '방 설정' : '방 생성'}
          </span>
          <span onClick={onClose} className="hover:cursor-pointer">
            <XIcon className="w-5 h-5 2xl:w-7 2xl:h-7 text-gray-700" />
          </span>
        </div>

        <div className="w-full grow-0 flex justify-between items-center px-6 2xl:text-xl border-t-2 border-b-2 border-black bg-white">
          <input
            {...register('title', {
              required: '제목을 입력해주세요.',
              validate: {
                length: s => s.length < 25 || '24자 이하로 입력해주세요.',
              },
            })}
            placeholder="방 제목을 입력해주세요."
            type="text"
            className={`${cls('w-[90%] h-full focus:outline-none py-5')}`}
            autoComplete="off"
            maxLength={24}
          />
          <CheckIcon
            className={`w-5 h-5 2xl:w-7 2xl:h-7 ${
              errors.title?.message || !watch('title')
                ? 'text-gray-500'
                : 'text-green-600'
            }`}
          />
        </div>

        <div className="w-full grow-[3.5] border-black flex">
          <div className="w-1/2 h-full border-r-2 border-black">
            <TimeCard
              register={register('hintTime', {
                required: true,
              })}
              kind="hintTime"
              difficulty={+watch('hintTime') > 9 ? 'Easy' : 'Hard'}
              description={
                +watch('hintTime') > 9
                  ? difficultyDescriptions.hintTime.easy
                  : difficultyDescriptions.hintTime.hard
              }
              watch={watch}
              setValue={setValue}
            />
          </div>
          <div className="w-1/2 h-full">
            <TimeCard
              register={register('reasoningTime', {
                required: true,
              })}
              kind="reasoningTime"
              difficulty={+watch('reasoningTime') > 9 ? 'Easy' : 'Hard'}
              description={
                +watch('reasoningTime') > 9
                  ? difficultyDescriptions.reasoningTime.easy
                  : difficultyDescriptions.reasoningTime.hard
              }
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>

        <div className="w-full px-5 2xl:px-7 grow bg-black flex justify-between items-center">
          <span className="text-white text-xl 2xl:text-2xl">총 게임시간</span>
          <span className="text-white font-hanson-bold text-2xl pt-1 2xl:text-4xl 2xl:pt-2">
            {+sumofTime < 10 ? `0${sumofTime}` : sumofTime}:00
          </span>
        </div>

        <div className="flex w-full grow-[2]">
          <div className="w-full h-full bg-white">
            <IsRandomSelecter {...{ watch, setValue, getValues }} />
          </div>
          <div className="h-full border-l-2 w-[28rem] 2xl:w-[34rem] border-black bg-white">
            <div
              onClick={() => toggleIsPrivate()}
              className="h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center px-6 disable-dragging hover:cursor-pointer hover:bg-black hover:text-white"
            >
              <span className="2xl:text-xl font-semibold">
                {isPrivate ? '비공개' : '공개'}
              </span>
              <span>
                {isPrivate ? (
                  <LockClosed className="w-5 h-5 2xl:w-6 2xl:h-6" />
                ) : (
                  <LockOpen className="w-5 h-5 2xl:w-6 2xl:h-6" />
                )}
              </span>
            </div>
            <div
              className={`h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center px-6 disable-dragging ${
                isPrivate ? '' : 'bg-gray-300'
              }`}
            >
              <span className="2xl:text-xl font-semibold">비밀번호</span>
            </div>
            <div
              className={`h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center px-6 disable-dragging ${
                isPrivate ? '' : 'bg-gray-300'
              }`}
            >
              <input
                {...register('password', {
                  required: isPrivate ? '비밀번호를 입력해주세요.' : false,
                  validate: {
                    roomPasswordCheck,
                    passwordLength: s =>
                      s.length < 9 || '비밀번호는 8자 이하로 입력해주세요.',
                  },
                })}
                placeholder={isPrivate ? '숫자를 입력해주세요.' : ''}
                type="text"
                className={`${cls(
                  'w-full h-full border p-2 bg-transparent text-sm 2xl:text-xl border-none focus:outline-none',
                )}`}
                disabled={!isPrivate}
                autoComplete="off"
                maxLength={8}
              />
              {isPrivate ? (
                <CheckIcon
                  className={`w-5 h-5 2xl:w-7 2xl:h-7 ${
                    errors.password?.message || !watch('password')
                      ? 'text-gray-500'
                      : 'text-green-600'
                  }`}
                />
              ) : null}
            </div>
            <div className="h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center disable-dragging">
              <button
                type="submit"
                className="2xl:text-xl font-semibold w-full h-full text-left pl-6 pr-2 text-animate-layout-border bg-black hover:bg-white hover:text-black"
              >
                {initData ? '수정하기' : '방만들기'}
              </button>
            </div>
          </div>
        </div>

        <input
          {...register('isRandom', {
            required: '역할 배정 방식을 선택해주세요.',
          })}
          className="hidden"
        />
      </div>
    </form>
  );
}
