import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
import RoomCard from './room-card';
import { RoomData } from '../../libs/types/room';
import { Mousewheel, Scrollbar, Pagination, FreeMode } from 'swiper';
import { KeyboardEventHandler, useRef, useState } from 'react';
import ModalLayout from '../modal-layout';
import { useRouter } from 'next/router';

interface Props {
  roomList: RoomData[];
  isSearch?: boolean;
}

export interface ModalPasswordValidateProps {
  isActive: boolean;
  roomData?: RoomData;
}

export default function RoomList({ roomList, isSearch = false }: Props) {
  const router = useRouter();
  const [paginationVisible, setPaginationVisible] = useState(false);
  const [isModalActive, setIsModalActive] =
    useState<ModalPasswordValidateProps>({
      isActive: false,
    });

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSwiperMouseEnter = () => {
    setPaginationVisible(true);
  };
  const handleSwiperMouseLeave = () => {
    setPaginationVisible(false);
  };

  const handleModalClose = () => {
    setIsModalActive(prev => ({ ...prev, isActive: false }));
  };

  const handleKeyup: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      validatePassword();
    }
  };

  const handleClick = () => {
    validatePassword();
  };

  const validatePassword = () => {
    if (isModalActive.roomData?.password === passwordInputRef.current?.value) {
      router.push(`/room/${isModalActive.roomData?.id}/lobby`);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const pagination = {
    clickable: true,
    el: '.swiper-pagination',
    renderBullet() {
      return '<span class="swiper-pagination-bullet grow h-full rounded-full"></span>';
    },
  };

  return (
    <div
      className="h-full flex relative"
      onMouseEnter={handleSwiperMouseEnter}
      onMouseLeave={handleSwiperMouseLeave}
    >
      <Swiper
        pagination={pagination}
        mousewheel={true}
        freeMode={true}
        slidesPerView={3}
        className={`room-list-swiper w-full h-full ${
          isSearch ? '' : 'rounded-tl-xl'
        }`}
        modules={[Scrollbar, Mousewheel, FreeMode, Pagination]}
      >
        {roomList.map((roomData, index) => (
          <SwiperSlide
            key={`room${index}`}
            className="h-full w-1/3 border-r-2 border-animate-layout-border"
          >
            <RoomCard {...{ roomData, setIsModalActive, index }} />
          </SwiperSlide>
        ))}
        <div
          className={`swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal absolute z-10 bottom-0 w-full pt-[0.18rem] pb-[0.05rem] px-[1px] h-[0.6rem] bg-black ${
            roomList.length > 3 && paginationVisible ? 'flex' : 'hidden'
          }`}
        ></div>
      </Swiper>
      {roomList.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
          아직 방이 없습니다.
        </div>
      ) : null}
      <ModalLayout
        background="dark"
        isActive={isModalActive.isActive}
        handleClose={handleModalClose}
      >
        <div className="w-[30vw] h-fit bg-white px-6 py-4 flex ">
          <input
            ref={passwordInputRef}
            onKeyUp={handleKeyup}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="w-full p-2 border-b-2 border-black focus:outline-none"
          />
          <button
            onClick={handleClick}
            className="h-fulll px-4 whitespace-nowrap bg-black text-white rounded-sm"
          >
            확인
          </button>
        </div>
      </ModalLayout>
    </div>
  );
}
