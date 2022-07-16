import { MouseEventHandler, RefObject, useEffect, useRef } from 'react';
import { cls, imagedataToImageUrl } from '../libs/client/utils';
import html2canvas from 'html2canvas';

interface Props {
  width: number;
  height: number;
  target?: RefObject<HTMLElement>;
  onCapture: (imgUrl: string) => unknown | void;
  isActive: boolean;
}

export default function CaptureCursor({
  width,
  height,
  target,
  onCapture,
  isActive,
}: Props) {
  const bg = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);

  const captureEvent: MouseEventHandler<HTMLDivElement> = e => {
    if (flash.current) flash.current.style.display = 'block';

    setTimeout(async () => {
      if (bg.current) bg.current.style.display = 'none';
      if (flash.current) flash.current.style.display = 'none';
      const canvas = await html2canvas(document.body);
      const imageUrl = imagedataToImageUrl(
        canvas
          .getContext('2d')
          ?.getImageData(
            e.pageX - width / 2,
            e.pageY - height / 2,
            width,
            height,
          ),
      );
      if (imageUrl) onCapture(imageUrl);
    }, 120);
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
          'text-center box-border border-solid border-[#00000090] fixed z-40 top-0 left-0 w-full h-full hover:cursor-crosshair',
        )}
      ></div>
      <div
        ref={flash}
        className="hidden fixed top-0 left-0 w-full h-screen bg-white"
      ></div>
    </>
  );
}
