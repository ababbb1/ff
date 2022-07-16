import React, { useRef } from 'react';

interface Props {
  width: number;
  height: number;
}

const UserVideo = React.forwardRef<HTMLVideoElement, Props>(
  ({ width, height }, ref) => {
    return (
      <div
        className={`w-[${width}px] h-[${height}px] flex justify-center items-center bg-black`}
      >
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          width={width}
          height={height}
          style={{ transform: 'rotateY(180deg)' }}
        />
      </div>
    );
  },
);

export default UserVideo;
