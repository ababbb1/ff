import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { NavigationOptions } from 'swiper/types';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { cls } from '../libs/client/utils';

interface Props {
  episodes: string[];
  onValid: (data: RoomFormData) => void | any;
  initData?: RoomFormData;
  master?: string;
}

export interface RoomFormData {
  title: string;
  password: string;
  episode: string;
  hintTime: string;
  reasoningTime: string;
  master: string;
  isRandom: boolean;
}

export default function RoomForm({
  episodes,
  onValid,
  initData,
  master,
}: Props) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const { register, handleSubmit, setValue, watch } = useForm<RoomFormData>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    console.log(initData);
    setValue('episode', episodes[0]);
    setValue('master', master || '');
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full h-full flex flex-col lg:flex-row"
    >
      <div className="bg-red-300 w-full h-full lg:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full h-full bg-white">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={swiper => {
              const nav = swiper.params.navigation as NavigationOptions;
              nav.prevEl = navigationPrevRef.current;
              nav.nextEl = navigationNextRef.current;
            }}
            slidesPerView={1}
            loop
            onSlideChange={swiper => {
              setValue('episode', episodes[swiper.realIndex]);
            }}
            className="w-full h-full"
          >
            <SwiperSlide className="bg-teal-300"></SwiperSlide>
            <SwiperSlide className="bg-purple-300"></SwiperSlide>
            <div
              ref={navigationPrevRef}
              className="absolute left-2 bottom-4 z-10 hover:cursor-pointer"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </div>
            <div
              ref={navigationNextRef}
              className="absolute right-2 bottom-4 z-10 hover:cursor-pointer"
            >
              <ChevronRightIcon className="w-8 h-8" />
            </div>
          </Swiper>
        </div>
      </div>

      <div className="bg-blue-300 w-full lg:w-1/2 lg:h-full">
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

        <span>{watch('episode') || '해당 에피소드는 준비중입니다.'}</span>

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
