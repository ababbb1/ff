import { useEffect, useRef, useState } from 'react';
import useTimeout from '../../libs/hooks/useTimeout';
import GlitterIcon from '../svg/layout/glitter';

interface Props {
  children?: React.ReactNode;
}

export default function AnimatedTextLayout({ children }: Props) {
  const [horizontalItemCount, setHorizontalItemCount] = useState<number>(1);
  const [verticalItemCount, setVerticalItemCount] = useState<number>(1);
  const [horizontalDuration, setHorizontalDuration] = useState<number>(0);
  const [verticalDuration, setVerticalDuration] = useState<number>(0);

  const horizontalItem = useRef<HTMLSpanElement>(null);
  const verticalItem = useRef<HTMLSpanElement>(null);

  const setCount = () => {
    if (window && horizontalItem.current && verticalItem.current) {
      setHorizontalItemCount(
        Math.floor(window.innerWidth / horizontalItem.current?.offsetWidth),
      );
      setVerticalItemCount(
        Math.floor(window.innerHeight / verticalItem.current?.offsetWidth),
      );
    }
  };

  const setDelay = () => {
    setHorizontalDuration(Math.round(window.innerWidth / 100));
    setVerticalDuration(Math.round(window.innerHeight / 100));
  };

  useTimeout(() => {
    setCount();
    setDelay();
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', setCount);
    window.addEventListener('resize', setDelay);
    return () => {
      window.removeEventListener('resize', setCount);
      window.removeEventListener('resize', setDelay);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
      {/* top */}
      <div
        className={`absolute flex top-0 left-[-100vw] h-8 z-10 whitespace-nowrap animate-[text-move-right_infinite_linear] bg-animate-layout-border`}
        style={{
          animationDuration: `${horizontalDuration}s`,
        }}
      >
        {['CRIME SCENE DO NOT CROSS', 'CRIME SCENE DO NOT CROSS'].map(
          (v, i) => (
            <div
              key={i}
              className="w-[100vw] flex justify-around overflow-hidden"
            >
              {Array(horizontalItemCount)
                .fill(0)
                .map((_, i) => (
                  <span
                    ref={i === 0 ? horizontalItem : null}
                    key={i}
                    className="flex items-center h-full pt-1 disable-dragging font-hanson-bold"
                  >
                    {v}
                  </span>
                ))}
            </div>
          ),
        )}
      </div>

      {/* right */}
      <div
        className="absolute flex top-0 right-[-100vh] h-8 z-10 whitespace-nowrap animate-[text-move-down_infinite_linear] bg-animate-layout-border"
        style={{
          animationDuration: `${verticalDuration}s`,
        }}
      >
        {['CRIME SCENE DO NOT CROSS', 'CRIME SCENE DO NOT CROSS'].map(
          (v, i) => (
            <div
              key={i}
              className="w-[100vh] flex justify-around overflow-hidden"
            >
              {Array(verticalItemCount)
                .fill(0)
                .map((_, i) => (
                  <span
                    ref={i === 0 ? verticalItem : null}
                    key={i}
                    className="flex items-center h-full pt-1 disable-dragging font-hanson-bold"
                  >
                    {v}
                  </span>
                ))}
            </div>
          ),
        )}
      </div>

      {/* bottom */}
      <div
        className="absolute flex bottom-0 right-[-100vw] h-8 z-10 whitespace-nowrap animate-[text-move-left_infinite_linear] bg-animate-layout-border"
        style={{
          animationDuration: `${horizontalDuration}s`,
        }}
      >
        {['CRIME SCENE DO NOT CROSS', 'CRIME SCENE DO NOT CROSS'].map(
          (v, i) => (
            <div
              key={i}
              className="w-[100vw] flex justify-around overflow-hidden"
            >
              {Array(horizontalItemCount)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className="flex items-center h-full pt-1 disable-dragging font-hanson-bold"
                  >
                    {v}
                  </span>
                ))}
            </div>
          ),
        )}
      </div>

      {/* left */}
      <div
        className="absolute flex bottom-0 left-[-100vh] h-8 z-10 whitespace-nowrap animate-[text-move-top_infinite_linear] bg-animate-layout-border"
        style={{
          animationDuration: `${verticalDuration}s`,
        }}
      >
        {['CRIME SCENE DO NOT CROSS', 'CRIME SCENE DO NOT CROSS'].map(
          (v, i) => (
            <div
              key={i}
              className="w-[100vh] flex justify-around overflow-hidden"
            >
              {Array(verticalItemCount)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className="flex items-center h-full pt-1 disable-dragging font-hanson-bold"
                  >
                    {v}
                  </span>
                ))}
            </div>
          ),
        )}
      </div>

      <div className="absolute top-0 left-0 w-8 h-8 z-20 bg-animate-layout-border flex justify-center items-center p-[7px]">
        <GlitterIcon />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 z-20 bg-animate-layout-border flex justify-center items-center p-[7px]">
        <GlitterIcon />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 z-20 bg-animate-layout-border flex justify-center items-center p-[7px]">
        <GlitterIcon />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8 z-20 bg-animate-layout-border flex justify-center items-center p-[7px]">
        <GlitterIcon />
      </div>

      <section className="w-full h-full p-8">{children}</section>
    </div>
  );
}
