import { useEffect, useState } from 'react';
import Timer from '../../timer';
import HintBoard from './hint-board';
import HintImage from './hint-image';
import { DropTargetMonitor } from 'react-dnd';
import { ImageInfo } from '../../../libs/types/room';
import { useRecoilState } from 'recoil';
import {
  boardImageListState,
  imageListState,
  roomInfoState,
} from '../../../libs/client/room';
import { socket } from '../socket';
import Image from 'next/image';

export default function RoomReasoning() {
  const [roomInfo] = useRecoilState(roomInfoState);
  const [imageList, setImageList] = useRecoilState(imageListState);
  const [boardImageList] = useRecoilState(boardImageListState);

  const handleDrop = (item: ImageInfo, monitor: DropTargetMonitor) => {
    console.log(item);
    const coord = monitor.getClientOffset();

    item.isDropped = true;
    item.x = (coord?.x as number) + window.scrollX;
    item.y = (coord?.y as number) + window.scrollY;

    setImageList(imageList.map(v => (v.id === item.id ? item : v)));
    socket.emit('hint_board', { imageInfo: item, roomId: roomInfo?.id });
  };

  useEffect(() => {
    console.log(boardImageList);
  }, [boardImageList]);

  return (
    <div className="w-full h-full">
      <Timer
        seconds={roomInfo?.reasoningTime ? +roomInfo.reasoningTime * 60 : 0}
        isActive={false}
      />
      <HintBoard
        accept={'hint_image'}
        onDrop={(item, monitor) => handleDrop(item, monitor)}
      />
      <div className="flex relative">
        {imageList.map(({ id, isDropped, previewUrl }, i) => (
          <HintImage
            id={id}
            type={`hint_image`}
            isDropped={isDropped}
            previewUrl={previewUrl}
            key={i}
          />
        ))}
      </div>
      {boardImageList?.map((v, i) => (
        <div
          key={`boardImage${i}`}
          style={{ position: 'absolute', left: `${v.x}px`, top: `${v.y}px` }}
        >
          <Image src={v.previewUrl} width={100} height={100} />
        </div>
      ))}
    </div>
  );
}
