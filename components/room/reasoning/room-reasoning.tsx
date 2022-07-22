import Timer from '../../timer';
import HintBoard from './hint-board';
import HintImage from './hint-image';
import { DropTargetMonitor } from 'react-dnd';
import { ImageData } from '../../../libs/types/room';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { hintPostOnBoard } from '../../../libs/socket.io';

export default function RoomReasoning() {
  const [{ roomInfo, imageList, boardImageList }, dispatch] = useRoomContext();

  const handleDrop = (item: ImageData, monitor: DropTargetMonitor) => {
    const coord = monitor.getClientOffset();

    item.isDropped = true;
    item.x = (coord?.x as number) + window.scrollX;
    item.y = (coord?.y as number) + window.scrollY;

    const imageListWithoutDroppedItem = imageList.map(v =>
      v.id === item.id ? item : v,
    );

    dispatch({ type: 'IMAGE_LIST', payload: imageListWithoutDroppedItem });
    hintPostOnBoard({ imageInfo: item, roomId: roomInfo?.id });
  };

  return (
    <div className="w-full h-full">
      <Timer
        seconds={roomInfo?.reasoningTime ? +roomInfo.reasoningTime * 60 : 0}
        isActive
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
      {boardImageList.map((v, i) => (
        <div
          key={`boardImage${i}`}
          style={{ position: 'absolute', left: `${v.x}px`, top: `${v.y}px` }}
        >
          <img src={v.previewUrl} width={100} height={100} />
        </div>
      ))}
    </div>
  );
}
