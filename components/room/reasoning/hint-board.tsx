import { useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { ImageData } from '../../../libs/types/room';

export interface HintBoardProps {
  accept: string;
  lastDroppedItem?: any;
  onDrop: (item: ImageData, monitor: DropTargetMonitor) => void;
  boardImageList: ImageData[];
}

export default function HintBoard({
  accept,
  onDrop,
  boardImageList,
}: HintBoardProps) {
  const lastBoardImageRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop, didDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        didDrop: monitor.didDrop(),
      };
    },
  });

  useUpdateEffect(() => {
    if (lastBoardImageRef.current) {
      console.log(
        'received items coords:',
        lastBoardImageRef.current.offsetLeft,
        lastBoardImageRef.current.offsetTop,
      );
    }
  }, [boardImageList]);

  return (
    <div ref={drop} className="droppable w-full h-full relative">
      {boardImageList.map((v, i) => {
        // const DPR = window.devicePixelRatio;
        return (
          <div
            ref={lastBoardImageRef}
            key={`boardImage${i}`}
            style={{
              left: `${v.x}%`,
              top: `${v.y}%`,
            }}
            className="absolute w-[10%] h-[10%]"
          >
            <img src={v.previewUrl} className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}
