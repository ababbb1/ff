import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';
import HintReadyPage1 from './hint-ready-page1';
import HintReadyPage2 from './hint-ready-page2';

interface Props {
  handleHintReadyButton: () => void;
  isHintTime: boolean;
}

export default function HintReadySlide({
  handleHintReadyButton,
  isHintTime,
}: Props) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full h-12 border-b border-black flex justify-between items-center px-6 absolute">
        <span className="text-xl">WAU</span>
        <span className="font-semibold text-xl">사건개요</span>
        <span className="opacity-0 text-xl">WAU</span>
      </div>

      <div className="w-full h-full pt-12">
        <Swiper
          allowTouchMove={false}
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={swiper => {
            const nav = swiper.params.navigation as NavigationOptions;
            nav.prevEl = navigationPrevRef.current;
            nav.nextEl = navigationNextRef.current;
          }}
          onSlideChange={swiper => setCurrentPage(swiper.realIndex + 1)}
          slidesPerView={1}
          effect={'creative'}
          className="hint-page-swiper w-full h-full"
        >
          <SwiperSlide>
            <HintReadyPage1 />
          </SwiperSlide>
          <SwiperSlide>
            <HintReadyPage2 />
          </SwiperSlide>
          {!isHintTime && (
            <SwiperSlide>
              <div>
                <button onClick={handleHintReadyButton}>ready</button>
              </div>
            </SwiperSlide>
          )}

          <div className="w-[14%] z-10 absolute bottom-0 right-0 flex justify-between px-6 py-4">
            <div ref={navigationPrevRef} className={`hover:cursor-pointer`}>
              <ArrowSmLeftIcon
                className={`w-10 h-10 ${currentPage === 1 ? 'opacity-30' : ''}`}
                strokeWidth={2}
              />
            </div>

            <div ref={navigationNextRef} className={`hover:cursor-pointer`}>
              <ArrowSmRightIcon className="w-10 h-10" strokeWidth={2} />
            </div>
          </div>
        </Swiper>
        <div
          className={`absolute left-[50%] -bottom-4 -translate-x-[50%] translate-y-[100%] z-10 text-white flex gap-3 items-center`}
        >
          <span>{`0${currentPage}`}</span>
          <div
            className={`flex w-36 h-1 bg-gray-100 border border-white `}
          ></div>
          <span>{`00`}</span>
        </div>
      </div>
    </div>
  );
}
