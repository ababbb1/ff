import { RefObject, useEffect, useRef } from 'react';
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

  const captureEvent = (e: MouseEvent) => {
    if (flash.current) flash.current.style.display = 'block';
    setTimeout(async () => {
      if (flash.current) flash.current.style.display = 'none';
      const canvas = await html2canvas(document.body);
      const imgUrl = imagedataToImageUrl(
        canvas
          .getContext('2d')
          ?.getImageData(
            e.pageX - width / 2,
            e.pageY - height / 2,
            width,
            height,
          ),
      );

      if (imgUrl) onCapture(imgUrl);
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
        bg.current.style.display = 'block';
        bg.current.style.borderTopWidth = `${e.clientY - height / 2}px`;
        bg.current.style.borderRightWidth = `${
          window.innerWidth - e.clientX - width / 2
        }px`;
        bg.current.style.borderBottomWidth = `${
          window.innerHeight - e.clientY - height / 2
        }px`;
        bg.current.style.borderLeftWidth = `${e.clientX - width / 2}px`;
      } else {
        bg.current.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    const captureScreen = bg.current;
    if (captureScreen) {
      document.addEventListener('mousemove', mouseMove);
      captureScreen.addEventListener('click', captureEvent);
    }

    return () => {
      if (captureScreen) {
        document.removeEventListener('mousemove', mouseMove);
        captureScreen.removeEventListener('click', captureEvent);
      }
    };
  });

  return (
    <>
      <div
        ref={bg}
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
