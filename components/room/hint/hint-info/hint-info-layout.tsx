import { XIcon } from '@heroicons/react/outline';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import Timer from '../../../timer';

interface Props extends PropsWithChildren {
  theme?: 'black' | 'white';
  title: string;
  timer?: boolean;
  closeButon?: boolean;
  currentTimeLimit?: number;
}

export default function HintInfoLayout({
  children,
  theme = 'white',
  title,
  timer = false,
  closeButon = true,
  currentTimeLimit,
}: Props) {
  const oppositeColor = theme === 'black' ? 'white' : 'black';
  const bg = `bg-${theme}`;
  const border = `border-${oppositeColor}`;
  const text = `text-${oppositeColor}`;

  const timeBarRef = useRef<HTMLDivElement>(null);

  const timeBarActive = (timeLimit: number) => {
    if (timeBarRef.current) {
      timeBarRef.current.style.transition = '';
      timeBarRef.current.style.width = '100%';
      setTimeout(() => {
        if (timeBarRef.current) {
          timeBarRef.current.style.transition = `width linear ${timeLimit}s`;
          timeBarRef.current.style.width = '0';
        }
      }, 100);
    }
  };

  useEffect(() => {
    console.log(currentTimeLimit);
    if (currentTimeLimit) {
      timeBarActive(currentTimeLimit);
    }
  }, [currentTimeLimit]);

  return (
    <div
      className={`aspect-video h-[40rem] 2xl:h-[50rem] rounded-md border-2 ${border} ${bg} ${text} disable-dragging`}
    >
      <div className={`w-full h-full flex flex-col`}>
        <div
          className={`w-full h-14 2xl:h-16 border-b-2 ${border} flex justify-between px-6 py-3`}
        >
          <div className="w-1/3 h-full flex items-center">
            <img
              src={`/assets/logo-${oppositeColor}-sm.webp`}
              className="h-full"
            />
          </div>
          <div className="w-1/3 h-full flex items-center justify-center font-semibold text-xl">
            {title}
          </div>
          <div className="w-1/3 h-full flex items-center justify-end hover:cursor-pointer">
            {timer && currentTimeLimit && <Timer seconds={currentTimeLimit} />}
            {closeButon && <XIcon className={`w-6 h-6 2xl:w-7 2x:h-7`} />}
          </div>
        </div>

        {timer && (
          <div className="w-full h-2 border-b-2 border-black">
            <div
              ref={timeBarRef}
              className="h-full w-full bg-animate-layout-border transition-all"
            ></div>
          </div>
        )}

        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
