import { useEffect, useRef } from 'react';

export default function RoomReasoning() {
  const hintsRef = useRef<HTMLDivElement[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hintEls = hintsRef.current;
    let currentDroppable: HTMLElement | null = null;

    hintEls.forEach(el => {
      const startX = el.offsetLeft;
      const startY = el.offsetTop;

      el.onmousedown = (e: MouseEvent) => {
        el.style.cursor = 'grabbing';

        const shiftX = e.clientX - el.getBoundingClientRect().left;
        const shiftY = e.clientY - el.getBoundingClientRect().top;

        el.style.position = 'absolute';
        el.style.zIndex = '1000';

        document.body.append(el);

        const moveAt = (pageX: number, pageY: number) => {
          el.style.left = pageX - shiftX + 'px';
          el.style.top = pageY - shiftY + 'px';
        };

        moveAt(e.pageX, e.pageY);

        const onMouseMove = (e: MouseEvent) => {
          moveAt(e.pageX, e.pageY);

          el.hidden = true;
          const elBelow = document.elementFromPoint(e.clientX, e.clientY);
          el.hidden = false;

          if (!elBelow) return;

          const board = elBelow.closest<HTMLElement>('.droppable');
          if (currentDroppable != board) {
            if (currentDroppable) {
              console.log('leave');
            }
            currentDroppable = board;
            if (currentDroppable) {
              console.log('enter');
            }
          }
        };

        document.addEventListener('mousemove', onMouseMove);

        el.onmouseup = () => {
          console.log(startX, startY);
          el.style.left = `${startX}`;
          el.style.top = `${startY}`;
          el.style.cursor = 'grab';
          document.removeEventListener('mousemove', onMouseMove);
          el.onmouseup = null;
        };
      };

      el.ondragstart = () => false;
    });

    return () => {
      hintEls.forEach(el => {
        el.onmousedown = null;
      });
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div
        ref={boardRef}
        className="droppable bg-red-300 w-[50rem] h-[40rem]"
      ></div>
      <div className="flex">
        {[1, 2, 3].map((v, i) => (
          <div
            key={`hint${i}`}
            ref={el => (hintsRef.current[i] = el as HTMLDivElement)}
            className="bg-blue-300 w-10 h-10 border border-black hover:cursor-grab"
          ></div>
        ))}
      </div>
    </div>
  );
}
