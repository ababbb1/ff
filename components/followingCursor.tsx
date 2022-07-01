import { useEffect, useRef } from 'react';
import { fromEvent, merge } from 'rxjs';
import { cls } from '../libs/client/utils';

interface Props {
  visible: boolean;
  children: React.ReactNode;
  cursor?: boolean;
}

export default function FollowingCursor({
  visible,
  children,
  cursor = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
      const documentMouseOn$ = fromEvent<MouseEvent>(document, 'mouseon');
      const documentMouseOut$ = fromEvent<MouseEvent>(document, 'mouseout');

      merge(documentMouseOn$, mouseMove$).subscribe(({ pageX, pageY }) => {
        if (ref.current) {
          ref.current.style.visibility = 'visible';
          ref.current.style.left = `${pageX}px`;
          ref.current.style.top = `${pageY}px`;
        }
      });

      documentMouseOut$.subscribe(() => {
        if (ref.current) {
          ref.current.style.visibility = 'hidden';
        }
      });
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      className={cls(
        visible ? 'block' : 'hidden',
        cursor ? '' : 'hover:cursor-none',
        'fixed z-50 -translate-x-1/2 -translate-y-1/2',
      )}
    >
      {children}
    </div>
  );
}
