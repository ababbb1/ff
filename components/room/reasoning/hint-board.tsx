import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ImageInfo } from '../../../libs/types/room';

export interface HintBoardProps {
  accept: string;
  lastDroppedItem?: any;
  onDrop: (item: ImageInfo, monitor: DropTargetMonitor) => void;
}

export default function HintBoard({ accept, onDrop }: HintBoardProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });
  console.log(isOver, canDrop);

  return (
    <div ref={drop} className="droppable bg-black w-[50rem] h-[40rem]"></div>
  );
}
