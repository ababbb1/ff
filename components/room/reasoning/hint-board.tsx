import { IMAGE_SIZE_HORIZONTAL } from '../../../libs/const';
import { ImageData } from '../../../libs/types/room';

export interface HintBoardProps {
  boardImageList: ImageData[];
}

export default function HintBoard({ boardImageList }: HintBoardProps) {
  const [horizontalImageWidth, horizontalImageHeight] = IMAGE_SIZE_HORIZONTAL;

  return (
    <div className="droppable w-[2000px] h-[2000px] relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
