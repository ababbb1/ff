import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';
import { EPISODES } from '../../libs/const';
import { EpisodeInfo } from '../../libs/types/room';

interface Props {
  initEpisode?: EpisodeInfo;
  onChange: (episode: EpisodeInfo) => void;
  isActive: boolean;
}

export default function EpisodeSelecter({
  initEpisode,
  onChange,
  isActive,
}: Props) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState<number>(
    initEpisode ? EPISODES.indexOf(initEpisode) : 0,
  );

  const pagination = {
    clickable: true,
    el: '.swiper-pagination',
    renderBullet() {
      return '<span class="swiper-pagination-bullet grow h-full"></span>';
    },
  };

  useEffect(() => {
    onChange(initEpisode || EPISODES[0]);
  }, []);

  return (
    <div className="w-full h-full">
      <Swiper
        allowTouchMove={false}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={pagination}
        onBeforeInit={swiper => {
          const nav = swiper.params.navigation as NavigationOptions;
          nav.prevEl = navigationPrevRef.current;
          nav.nextEl = navigationNextRef.current;

          if (initEpisode)
            swiper.slideTo(
              Object.values(EPISODES)
                .map(v => v.title)
                .indexOf(initEpisode.title),
            );
        }}
        slidesPerView={1}
        loop
        onSlideChange={swiper => {
          onChange(EPISODES[swiper.realIndex]);
          setCurrentIndex(swiper.realIndex);
        }}
        className="episode-selecter w-full h-full disable-dragging"
      >
        <SwiperSlide className="">
          <img
            src="/assets/episode1.png"
            style={{ width: '100%', height: '100%' }}
          />
        </SwiperSlide>

        {!initEpisode && (
          <SwiperSlide className="flex justify-center items-center bg-black text-white font-hanson-bold text-6xl">
            Random
          </SwiperSlide>
        )}

        {/* <div
          className={`absolute bottom-0 w-full h-full z-10 border-black border-l border-t border-b transition-all duration-700 ${
            isActive ? 'opacity-100' : 'opacity-90 translate-y-9'
          }`}
        > */}
        <div
          ref={navigationPrevRef}
          className={`absolute left-6 top-[50%] -translate-y-[50%] z-10 w-16 h-16 border-2 border-gray-200 rounded-full bg-[#00000033] flex items-center justify-center hover:cursor-pointer transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 translate-y-9 -z-10'
          }`}
        >
          <ChevronLeftIcon className="w-8 h-8 text-gray-200" strokeWidth={2} />
        </div>

        <div
          ref={navigationNextRef}
          className={`absolute right-6 top-[50%] -translate-y-[50%] z-10 w-16 h-16 border-2 border-gray-200 rounded-full bg-[#00000033] flex items-center justify-center hover:cursor-pointer transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 translate-y-9 -z-10'
          }`}
        >
          <ChevronRightIcon className="w-8 h-8 text-gray-200" strokeWidth={2} />
        </div>

        {/* <div className="swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal absolute left-[50%] bottom-[2%] -translate-x-[50%] w-fit flex items-center gap-2 text-gray-100 text-xl disable-dragging"></div> */}
        <div
          className={`absolute left-[50%] bottom-[3%] -translate-x-[50%] z-10 2xl:text-2xl text-white flex gap-3 items-center transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 translate-y-9 -z-10'
          }`}
        >
          <span>{`0${currentIndex + 1}`}</span>
          <div
            className={`swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal flex w-[10rem] h-[6px] bg-gray-100 border border-white `}
          ></div>
          <span>{`0${
            initEpisode ? EPISODES.length - 1 : EPISODES.length
          }`}</span>
        </div>
        {/* </div> */}
      </Swiper>
    </div>
  );
}
