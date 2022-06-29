import { useEffect, useRef, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function AnimatedTextLayout({ children }: Props) {
  const [horizontalItemCount, setHorizontalItemCount] = useState<number>(1);
  const [verticalItemCount, setVerticalItemCount] = useState<number>(1);
  const horizontalItem = useRef<HTMLSpanElement>(null);
  const verticalItem = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const setCount = () => {
      if (horizontalItem.current && verticalItem.current) {
        setHorizontalItemCount(
          Math.floor(window.innerWidth / horizontalItem.current?.offsetWidth),
        );
        setVerticalItemCount(
          Math.floor(window.innerHeight / verticalItem.current?.offsetWidth),
        );
      }
    };
    setCount();
    window.addEventListener('resize', setCount);
  }, []);

  useEffect(() => {
    console.log(horizontalItemCount, verticalItemCount);
  }, [horizontalItemCount, verticalItemCount]);

  return (
    <div className="w-full h-screen p-7 bg-gray-400 flex justify-center items-center relative overflow-hidden">
      {/* top */}
      <div className="absolute flex top-0 left-[-100vw] z-10 whitespace-nowrap animate-[text-move-right_16s_infinite_linear]">
        {['example', 'example'].map((v, i) => (
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
                  className="text-[100%] px-2 text-center"
                >
                  {v}
                </span>
              ))}
          </div>
        ))}
      </div>

      {/* right */}
      <div className="absolute flex top-0 right-[-100vh] z-10 whitespace-nowrap animate-[text-move-down_16s_infinite_linear]">
        {['example', 'example'].map((v, i) => (
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
                  className="text-[100%] px-2 text-center"
                >
                  {v}
                </span>
              ))}
          </div>
        ))}
      </div>

      {/* bottom */}
      <div className="absolute flex bottom-0 right-[-100vw] z-10 whitespace-nowrap animate-[text-move-left_16s_infinite_linear]">
        {['example', 'example'].map((v, i) => (
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
                  className="text-[100%] px-2 text-center"
                >
                  {v}
                </span>
              ))}
          </div>
        ))}
      </div>

      {/* left */}
      <div className="absolute flex bottom-0 left-[-100vh] z-10 whitespace-nowrap animate-[text-move-top_16s_infinite_linear]">
        {['example', 'example'].map((v, i) => (
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
                  className="text-[100%] px-2 text-center"
                >
                  {v}
                </span>
              ))}
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-7 h-7 bg-gray-400 z-20"></div>
      <div className="absolute top-0 right-0 w-7 h-7 bg-gray-400 z-20"></div>
      <div className="absolute bottom-0 right-0 w-7 h-7 bg-gray-400 z-20"></div>
      <div className="absolute bottom-0 left-0 w-7 h-7 bg-gray-400 z-20"></div>

      <section className="w-full h-full bg-white">{children}</section>
    </div>
  );
}
