import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
import RoomCard from './room-card';
import { RoomData } from '../../libs/types/room';
import { Mousewheel, Scrollbar, Pagination, FreeMode } from 'swiper';
import { useState } from 'react';
import { EPISODES } from '../../libs/const';

interface Props {
  roomList: RoomData[];
}

export default function RoomList({ roomList }: Props) {
  const dummy: RoomData[] = [
    {
      count: 1,
      hintReady: false,
      hintTime: '10',
      id: 1,
      isRandom: '0',
      master: 'master1',
      password: undefined,
      reasoningTime: '10',
      roomState: 'standby',
      roomUniqueId: 'string',
      title: '방제목1welkwjelfwelkwaegeawg',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 5,
      hintReady: false,
      hintTime: '20',
      id: 2,
      isRandom: '1',
      master: 'master2',
      password: '234',
      reasoningTime: '10',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목2',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 1,
      hintReady: false,
      hintTime: '12',
      id: 3,
      isRandom: '0',
      master: 'master3',
      password: undefined,
      reasoningTime: '20',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목3',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 1,
      hintReady: false,
      hintTime: 'false',
      id: 4,
      isRandom: '0',
      master: 'master1',
      password: 'undefined',
      reasoningTime: '10',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목4',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 1,
      hintReady: false,
      hintTime: 'false',
      id: 5,
      isRandom: '0',
      master: 'master1',
      password: 'undefined',
      reasoningTime: '10',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목5',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 1,
      hintReady: false,
      hintTime: 'false',
      id: 6,
      isRandom: '0',
      master: 'master1',
      password: 'undefined',
      reasoningTime: '10',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목6',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 1,
      hintReady: false,
      hintTime: 'false',
      id: 7,
      isRandom: '0',
      master: 'master1',
      password: 'undefined',
      reasoningTime: '10',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목7',
      userId: 1,
      episode: EPISODES[0],
    },
    {
      count: 1,
      hintReady: false,
      hintTime: 'false',
      id: 8,
      isRandom: '0',
      master: 'master1',
      password: 'undefined',
      reasoningTime: '10',
      roomState: '10',
      roomUniqueId: 'string',
      title: '방제목8',
      userId: 1,
      episode: EPISODES[0],
    },
  ];

  const [paginationVisible, setPaginationVisible] = useState(false);

  const handleSwiperMouseEnter = () => {
    setPaginationVisible(true);
  };
  const handleSwiperMouseLeave = () => {
    setPaginationVisible(false);
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
        className="room-list-swiper w-full h-full rounded-tl-xl"
        modules={[Scrollbar, Mousewheel, FreeMode, Pagination]}
      >
        {dummy.concat(roomList).map((v, i) => (
          <SwiperSlide
            key={`room${i}`}
            className="h-full w-1/3 border-r-2 border-black"
          >
            <RoomCard roomData={v} />
          </SwiperSlide>
        ))}
        <div
          className={`swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal absolute z-10 bottom-0 w-full pt-[0.18rem] pb-[0.05rem] px-[1px] h-[0.6rem] bg-black ${
            roomList?.concat(dummy).length > 3 && paginationVisible
              ? 'flex'
              : 'hidden'
          }`}
        ></div>
      </Swiper>
      {roomList.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
          아직 방이 없습니다.
        </div>
      ) : null}
    </div>
  );
}
