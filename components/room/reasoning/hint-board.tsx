import { RefObject } from 'react';
import { IMAGE_SIZE_HORIZONTAL } from '../../../libs/const';
import { ImageData } from '../../../libs/types/room';

export interface HintBoardProps {
  boardImageList: ImageData[];
  boardRef: RefObject<HTMLDivElement>;
}

export default function HintBoard({
  boardImageList,
  boardRef,
}: HintBoardProps) {
  const [horizontalImageWidth, horizontalImageHeight] = IMAGE_SIZE_HORIZONTAL;

  return (
    <div
      ref={boardRef}
      className="droppable w-full h-[3000px] relative bg-black"
    >
      <div className="w-full h-full">
        {boardImageList.map((v, i) => {
          // const DPR = window.devicePixelRatio;
          return (
            <div
              key={`boardImage${i}`}
              style={{
                left: `${v.x}px`,
                top: `${v.y}px`,
              }}
              className="absolute"
            >
              <img
                src={v.previewUrl}
                width={horizontalImageWidth / 3}
                height={horizontalImageHeight / 3}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
