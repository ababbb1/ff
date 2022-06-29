import { useEffect, useRef } from 'react';
import { fromEvent, merge } from 'rxjs';
import { cls } from '../libs/client/utils';

export default function FollowingCursor({ visible }: { visible: boolean }) {
  const circle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
      const documentMouseOn$ = fromEvent<MouseEvent>(document, 'mouseon');
      const documentMouseOut$ = fromEvent<MouseEvent>(document, 'mouseout');
      const documentLoad$ = fromEvent<UIEvent>(document, 'onload');

      documentLoad$.subscribe(console.log);

      merge(documentMouseOn$, mouseMove$).subscribe(({ pageX, pageY }) => {
        if (circle.current) {
          circle.current.style.visibility = 'visible';
          circle.current.style.left = `${pageX}px`;
          circle.current.style.top = `${pageY}px`;
        }
      });

      documentMouseOut$.subscribe(() => {
        if (circle.current) {
          circle.current.style.visibility = 'hidden';
        }
      });
    }
  }, [visible]);

  return (
    <div
      ref={circle}
      className={cls(
        visible ? 'block' : 'hidden',
        'absolute w-16 h-16 rounded-full bg-slate-600 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 invisible',
      )}
    ></div>
  );
}
