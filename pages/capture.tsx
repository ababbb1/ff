import { MouseEventHandler, useEffect, useRef, useState } from 'react';

export default function Capture() {
  const boardRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleBoardMouseMove: MouseEventHandler<HTMLDivElement> = e => {
    const boardX = e.nativeEvent.offsetX;
    const boardY = e.nativeEvent.offsetY;

    const boxWidth = boxRef.current?.offsetWidth;
    const boxHeight = boxRef.current?.offsetHeight;

    console.log(boardX, boardY);
    const boxEl = boxRef.current;
    if (boxEl && boxWidth && boxHeight) {
      boxEl.style.left = `${boardX - boxWidth / 2}px`;
      boxEl.style.top = `${boardY - boxHeight / 2}px`;
    }
  };

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current;
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        ref={boardRef}
        onMouseMove={handleBoardMouseMove}
        className="w-[600px] h-[600px] bg-teal-400 relative"
      >
        <div
          ref={boxRef}
          className="bg-black w-[150px] h-[150px] absolute"
        ></div>
      </div>
    </div>
  );
}
