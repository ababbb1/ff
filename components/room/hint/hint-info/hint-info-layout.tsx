import { XIcon } from '@heroicons/react/outline';
import { PropsWithChildren, useState } from 'react';

interface Props extends PropsWithChildren {
  theme?: 'black' | 'white';
  title: string;
  timer?: boolean;
  closeButon?: boolean;
}

export default function HintInfoLayout({
  children,
  theme = 'white',
  title,
  timer = false,
  closeButon = true,
}: Props) {
  const oppositeColor = theme === 'black' ? 'white' : 'black';
  const bg = `bg-${theme}`;
  const border = `border-${oppositeColor}`;
  const text = `text-${oppositeColor}`;

  return (
    <div
      className={`aspect-video h-[40rem] 2xl:h-[50rem] rounded-md border-2 ${border} ${bg} ${text} disable-dragging`}
    >
      <div className={`w-full h-full flex flex-col`}>
        <div
          className={`w-full h-14 2xl:h-16 border-b-2 ${border} flex justify-between px-4 py-3`}
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
            {closeButon && <XIcon className={`w-6 h-6 2xl:w-7 2x:h-7`} />}
          </div>
        </div>

        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
