import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Timer from '../../timer';
import HintBoard from './hint-board';
import HintImage from './hint-image';
import { DropTargetMonitor } from 'react-dnd';
import { ImageData, RoomData } from '../../../libs/types/room';
import Image from 'next/image';
import { Socket } from 'socket.io-client';

interface Props {
  imageListState: [ImageData[], Dispatch<SetStateAction<ImageData[]>>];
  socket: Socket;
  roomInfo: RoomData | null;
}

export default function RoomReasoning({
  imageListState,
  socket,
  roomInfo,
}: Props) {
  const [boardImageList, setBoardImageList] = useState<ImageData[]>([]);
  const [imageList, setImageList] = imageListState;

  const handleDrop = (item: ImageData, monitor: DropTargetMonitor) => {
    console.log(item);
    const coord = monitor.getClientOffset();

    item.isDropped = true;
    item.x = (coord?.x as number) + window.scrollX;
    item.y = (coord?.y as number) + window.scrollY;

    setImageList(imageList.map(v => (v.id === item.id ? item : v)));
    socket.emit('hint_board', { imageInfo: item, roomId: roomInfo?.id });
  };

  useEffect(() => {
    socket.on('board_image', (imageInfo: ImageData) => {
      setBoardImageList(prev => [...prev, imageInfo]);
    });
  }, []);

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
