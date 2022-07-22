import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions, PaginationOptions } from 'swiper/types';
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

  const pagination: PaginationOptions = {
    type: 'fraction',
    el: '.swiper-pagination',
    renderFraction(currentClass: string, totalClass: string) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        '&nbsp;/&nbsp;' +
        '<span class="' +
        totalClass +
        '"></span>'
      );
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
        onSlideChange={swiper => onChange(EPISODES[swiper.realIndex])}
        className="w-full h-full"
      >
        <SwiperSlide className="">
          <img
            src="/assets/episode-dummy.png"
            alt="episode-dummy"
            style={{
              width: '100%',
              height: '100%',
              borderTopRightRadius: '1rem',
            }}
          />
        </SwiperSlide>
        {!initEpisode && (
          <SwiperSlide className="flex justify-center items-center bg-black text-white font-hanson-bold text-6xl">
            Random
          </SwiperSlide>
        )}

        <div
          className={`absolute bottom-0 w-full h-9 z-10 bg-white border border-black flex justify-between items-center transition-all duration-700 ${
            isActive ? 'opacity-100' : 'opacity-90 translate-y-9'
          }`}
        >
          <div
            ref={navigationPrevRef}
            className="w-9 h-9 border-r border-black flex items-center justify-center hover:cursor-pointer"
          >
            <ChevronLeftIcon className="w-6 h-6" strokeWidth={1} />
          </div>

          <div className="swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal w-fit h-full flex items-center"></div>

          <div
            ref={navigationNextRef}
            className="w-9 h-9 border-l border-black flex items-center justify-center hover:cursor-pointer"
          >
            <ChevronRightIcon className="w-6 h-6" strokeWidth={1} />
          </div>
        </div>
      </Swiper>
    </div>
  );
}
