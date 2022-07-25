import 'swiper/css';
import 'swiper/css/navigation';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { cls, nicknameCheck, roomPasswordCheck } from '../../libs/utils';
import { EpisodeInfo, RoomData } from '../../libs/types/room';
import { EPISODES } from '../../libs/const';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import TimeCard from './time-card';
import useToggle from '../../libs/hooks/useToggle';
import LockClosed from '../svg/room-form/lock-closed';
import LockOpen from '../svg/room-form/lock-open';
import Check from '../svg/room-form/check';
import IsRandomSelecter from './is-random-selecter';

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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
    setValue('isRandom', initData?.isRandom === '1' || true);
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
  }, [isPrivate]);

  useEffect(() => {
    // eslint-disable-next-line
    const regExp = /^[1-5][0-9]*$|^[6][0]*$/;
    if (!regExp.test(watch('hintTime')) && watch('hintTime') !== '') {
      setValue('hintTime', '10');
    }
    if (!regExp.test(watch('reasoningTime')) && watch('reasoningTime') !== '') {
      setValue('reasoningTime', '10');
    }
  }, [watch('hintTime'), watch('reasoningTime')]);

  return (
    <form
      onSubmit={handleSubmit(handleValid, onInvalid)}
      className={`disable-dragging w-full h-full flex flex-col lg:flex-row absolute top-0 left-0 transition-all duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0 translate-y-[4%] -z-10'
      }`}
    >
      <div className="bg-crumpled-paper bg-cover w-full h-full border-2 border-black flex flex-col">
        <div className="w-full flex justify-between items-center px-4 py-4 2xl:py-[3vh]">
          <div className="w-5 h-5 2xl:w-7 2xl:h-7" />
          <span className="2xl:text-2xl font-semibold">방 생성</span>
          <span onClick={onClose} className="hover:cursor-pointer">
            <XIcon className="w-5 h-5 2xl:w-7 2xl:h-7 text-gray-700" />
          </span>
        </div>

        <div className="w-full relative">
          <input
            {...register('title', {
              required: '제목을 입력해주세요.',
              validate: {
                length: s => s.length < 21 || '20자 이하로 입력해주세요.',
              },
            })}
            placeholder="방 제목을 입력해주세요."
            type="text"
            className={`${cls(
              'w-full px-6 py-4 2xl:py-[2vh] text-xl border-t-2 border-b-2 border-black focus:outline-none',
            )}`}
            autoComplete="off"
          />
          <Check
            className={`w-12 h-12 2xl:w-16 2xl:h-16 absolute right-2 top-[50%] -translate-y-[50%] ${
              errors.title?.message || !watch('title')
                ? 'text-gray-500'
                : 'text-green-600'
            }`}
          />
        </div>

        <div className="w-full h-fit border-b-2 border-black flex">
          <div className="w-1/2 h-[18rem] 2xl:h-[26rem] max-h-[38vh] border-r-2 border-black">
            <TimeCard
              register={register('hintTime', {
                required: true,
              })}
              kind="hintTime"
              difficulty="Hard"
              description="Hard 설명"
              watch={watch}
              setValue={setValue}
            />
          </div>
          <div className="w-1/2 h-[18rem] 2xl:h-[26rem] max-h-[38vh]">
            <TimeCard
              register={register('reasoningTime', {
                required: true,
              })}
              kind="reasoningTime"
              difficulty="Easy"
              description="Easy 설명"
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>

        <div className="w-full px-4 2xl:px-6 py-4 2xl:py-[2vh] bg-black flex justify-between items-center">
          <span className="text-white 2xl:text-2xl">총 게임시간</span>
          <span className="text-white font-hanson-bold text-xl pt-1 2xl:text-4xl 2xl:pt-2">
            {+sumofTime < 10 ? `0${sumofTime}` : sumofTime}:00
          </span>
        </div>

        <div className="flex w-full h-full">
          <div className="w-full h-full bg-white">
            <IsRandomSelecter watch={watch} setValue={setValue} />
          </div>
          <div className="h-full border-l-2 w-[28rem] 2xl:w-[34rem] border-black bg-white">
            <div
              onClick={() => toggleIsPrivate()}
              className="h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center pl-6 pr-2 disable-dragging hover:cursor-pointer hover:bg-black hover:text-white"
            >
              <span className="2xl:text-xl font-semibold">
                {isPrivate ? '비공개' : '공개'}
              </span>
              <span>
                {isPrivate ? (
                  <LockClosed className="w-10 h-10 2xl:w-14 2xl:h-14" />
                ) : (
                  <LockOpen className="w-10 h-10 2xl:w-14 2xl:h-14" />
                )}
              </span>
            </div>
            <div
              className={`h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center pl-6 pr-2 disable-dragging ${
                isPrivate ? '' : 'bg-gray-300'
              }`}
            >
              <span className="2xl:text-xl font-semibold">비밀번호</span>
            </div>
            <div
              className={`h-1/4 w-full border-b-2 border-black last:border-none flex justify-between items-center pl-4 pr-2 disable-dragging relative ${
                isPrivate ? '' : 'bg-gray-300'
              }`}
            >
              <input
                {...register('password', {
                  validate: {
                    roomPasswordCheck,
                    passwordLength: s =>
                      s.length < 9 || '비밀번호는 8자 이하로 입력해주세요.',
                  },
                })}
                placeholder={isPrivate ? '숫자를 입력해주세요.' : ''}
                type="text"
                className={`${cls(
                  'w-full h-12 border rounded-md p-2 bg-transparent text-sm 2xl:text-xl border-none focus:outline-none',
                )}`}
                disabled={!isPrivate}
                autoComplete="off"
              />
              {isPrivate ? (
                <Check
                  className={`w-12 h-12 2xl:w-16 2xl:h-16 absolute right-2 top-[50%] -translate-y-[50%] ${
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
                className="2xl:text-xl font-semibold w-full h-full text-left pl-6 pr-2 hover:bg-black hover:text-white"
              >
                방만들기
              </button>
            </div>
          </div>
        </div>

        <input
          {...register('isRandom', {
            required: '역할 배정 방식을 선택해주세요.',
          })}
          type="checkbox"
          className="hidden"
        />

        {/* <input
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
        </div> */}
      </div>
    </form>
  );
}
