import { useCallback, useEffect, useRef, useState } from 'react';

export default function useScrollbar(padding: number) {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);

  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  const handleMouseEnterTarget = useCallback(() => {
    if (scrollTargetRef.current) {
      const ulScrollHeight = scrollTargetRef.current.scrollHeight;
      const ulHeight = scrollTargetRef.current.clientHeight;
      if (ulScrollHeight > ulHeight) {
        setIsScrollbarVisible(true);
      }
    }
  }, []);

  const handleMouseLeaveUlElement = useCallback(() => {
    setIsScrollbarVisible(false);
  }, []);

  const handleScrollTarget = useCallback(() => {
    if (
      scrollTargetRef.current &&
      scrollbarRef.current &&
      scrollThumbRef.current
    ) {
      const ulScrollTop = scrollTargetRef.current.scrollTop;
      const ulScrollHeight = scrollTargetRef.current.scrollHeight;
      const ulHeight = scrollTargetRef.current.clientHeight;
      const scrollbarHeight = scrollbarRef.current.offsetHeight;

      const top =
        (ulScrollTop / ulScrollHeight) * (scrollbarHeight - padding * 2);
      scrollThumbRef.current.style.top = `${top + padding}px`;

      const height =
        (ulHeight / ulScrollHeight) * (scrollbarHeight - padding * 2);
      scrollThumbRef.current.style.height = `${height}px`;
    }
  }, []);

  useEffect(() => {
    const scrollCurrentTargetRef = scrollTargetRef.current;

    if (scrollCurrentTargetRef) {
      scrollCurrentTargetRef.addEventListener(
        'mouseenter',
        handleMouseEnterTarget,
      );
      scrollCurrentTargetRef.addEventListener(
        'mouseleave',
        handleMouseLeaveUlElement,
      );
      scrollCurrentTargetRef.addEventListener('scroll', handleScrollTarget);

      return () => {
        if (scrollCurrentTargetRef) {
          scrollCurrentTargetRef.removeEventListener(
            'mouseenter',
            handleMouseEnterTarget,
          );
          scrollCurrentTargetRef.removeEventListener(
            'mouseenter',
            handleMouseLeaveUlElement,
          );
          scrollCurrentTargetRef.removeEventListener(
            'scroll',
            handleScrollTarget,
          );
        }
      };
    }
  }, [handleMouseEnterTarget, handleMouseLeaveUlElement, handleScrollTarget]);

  return {
    isScrollbarVisible,
    setIsScrollbarVisible,
    scrollTargetRef,
    scrollbarRef,
    scrollThumbRef,
  };
}
