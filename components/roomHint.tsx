import Image from 'next/image';
import { useState } from 'react';
import CaptureCursor from './captureCursor';

export default function RoomHint() {
  const cameraState = useState<boolean>(false);
  const imageListState = useState<HTMLImageElement[]>([]);

  return (
    <>
      <div>
        <div className="bg-red-300 w-[50rem] h-[40rem]">map</div>
      </div>
      <button
        onClick={() => {
          cameraState[1](true);
        }}
      >
        카메라
      </button>
      <div>
        {imageListState[0].map((img, i) => (
          <Image
            key={`hint${i}`}
            src={img.src}
            width={img.width / 2}
            height={img.height / 2}
            alt={`hint${i}`}
          />
        ))}
      </div>
      <CaptureCursor {...{ cameraState, imageListState }} />
    </>
  );
}
