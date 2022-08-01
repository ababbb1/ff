import { MouseEventHandler, RefObject, useEffect, useRef } from 'react';
import { cls, imagedataToImageUrl } from '../libs/utils';
import html2canvas from 'html2canvas';
import { IMAGE_SIZE_HORIZONTAL } from '../libs/const';

interface Props {
  target?: RefObject<HTMLElement>;
  onCapture: (imgUrl: string) => unknown | void;
  isActive: boolean;
}

export default function CaptureCursor({ target, onCapture, isActive }: Props) {
  const [width, height] = IMAGE_SIZE_HORIZONTAL;
  const bg = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);

  const captureEvent: MouseEventHandler<HTMLDivElement> = e => {
    if (flash.current) flash.current.style.display = 'block';

    setTimeout(async () => {
      const DPR = window.devicePixelRatio;
      if (bg.current) bg.current.style.display = 'none';
      if (flash.current) flash.current.style.display = 'none';
      const canvas = await html2canvas(document.body);
      const imageUrl = imagedataToImageUrl(
        canvas
          .getContext('2d')
          ?.getImageData(
            Math.round((e.pageX - width / 2) * DPR),
            Math.round((e.pageY - height / 2) * DPR),
            Math.round(width * DPR),
            Math.round(height * DPR),
          ),
      );
      if (imageUrl) onCapture(imageUrl);
    }, 300);
  };

  const isOnTarget = (clientX: number, clientY: number): boolean => {
    if (target && target.current) {
      const targetTop = target.current.offsetTop;
      const targetRight =
        target.current.offsetLeft + target.current.offsetWidth - window.scrollX;
      const targetBottom =
        target.current.offsetTop + target.current.offsetHeight - window.scrollY;
      const targetLeft = target.current.offsetLeft;

      return (
        clientX > targetLeft &&
        clientX < targetRight &&
        clientY > targetTop &&
        clientY < targetBottom
      );
    } else return false;
  };

  const mouseMove = (e: MouseEvent) => {
    if (bg.current) {
      if (isActive && isOnTarget(e.clientX, e.clientY)) {
        const borderTop = e.clientY - height / 2;
        const borderRight = window.innerWidth - e.clientX - width / 2;
        const borderBottom = window.innerHeight - e.clientY - height / 2;
        const borderLeft = e.clientX - width / 2;

        const calWidth = (n: number) => (n < 0 ? 0 : n);

        bg.current.style.display = 'block';
        bg.current.style.borderTopWidth = `${calWidth(borderTop)}px`;
        bg.current.style.borderRightWidth = `${calWidth(borderRight)}px`;
        bg.current.style.borderBottomWidth = `${calWidth(borderBottom)}px`;
        bg.current.style.borderLeftWidth = `${calWidth(borderLeft)}px`;
      } else {
        bg.current.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    const captureScreen = bg.current;
    if (captureScreen) {
      document.addEventListener('mousemove', mouseMove);
    }

    return () => {
      if (captureScreen) {
        document.removeEventListener('mousemove', mouseMove);
      }
    };
  });

  return (
    <>
      <div
        ref={bg}
        onClick={captureEvent}
        className={cls(
          isActive ? 'block' : 'hidden',
          'text-center box-border border-solid border-[#00000090] w-screen h-screen fixed z-40 top-0 left-0 hover:cursor-none',
        )}
      >
        <div className="w-full h-full relative">
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] translate-y-[50%] w-10 h-[2px] bg-black"></div>
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] translate-y-[50%] w-10 h-[2px] rotate-90 bg-black"></div>

          <div className="absolute top-4 left-4 w-28 h-[2px] bg-black"></div>
          <div className="absolute top-4 left-4 h-28 w-[2px] bg-black"></div>

          <div className="absolute top-4 right-4 w-28 h-[2px] bg-black"></div>
          <div className="absolute top-4 right-4 h-28 w-[2px] bg-black"></div>

          <div className="absolute bottom-4 left-4 w-28 h-[2px] bg-black"></div>
          <div className="absolute bottom-4 left-4 h-28 w-[2px] bg-black"></div>

          <div className="absolute bottom-4 right-4 w-28 h-[2px] bg-black"></div>
          <div className="absolute bottom-4 right-4 h-28 w-[2px] bg-black"></div>
        </div>
      </div>
      <div
        ref={flash}
        className="hidden fixed top-0 left-0 w-full h-screen bg-[#ffffffef]"
      ></div>
    </>
  );
}
