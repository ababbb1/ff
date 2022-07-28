import { useEffect, useRef, useState } from 'react';

export default function useScrollbar() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);

  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  const handleMouseEnterUlElement = () => {
    if (scrollTargetRef.current) {
      const ulScrollHeight = scrollTargetRef.current.scrollHeight;
      const ulHeight = scrollTargetRef.current.clientHeight;
      if (ulScrollHeight > ulHeight) {
        setIsScrollbarVisible(true);
      }
    }
  };

  const handleMouseLeaveUlElement = () => {
    setIsScrollbarVisible(false);
  };

  const handleScrollTarget = () => {
    if (
      scrollTargetRef.current &&
      scrollbarRef.current &&
      scrollThumbRef.current
    ) {
      const ulScrollTop = scrollTargetRef.current.scrollTop;
      const ulScrollHeight = scrollTargetRef.current.scrollHeight;
      const ulHeight = scrollTargetRef.current.clientHeight;
      const scrollbarHeight = scrollbarRef.current.offsetHeight;

      const top = (ulScrollTop / ulScrollHeight) * (scrollbarHeight - 6);
      scrollThumbRef.current.style.top = `${top + 3}px`;

      const height = (ulHeight / ulScrollHeight) * (scrollbarHeight - 6);
      scrollThumbRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.addEventListener(
        'mouseenter',
        handleMouseEnterUlElement,
      );
      scrollTargetRef.current.addEventListener(
        'mouseleave',
        handleMouseLeaveUlElement,
      );
      scrollTargetRef.current.addEventListener('scroll', handleScrollTarget);

      return () => {
        if (scrollTargetRef.current) {
          scrollTargetRef.current.removeEventListener(
            'mouseenter',
            handleMouseEnterUlElement,
          );
          scrollTargetRef.current.removeEventListener(
            'mouseenter',
            handleMouseLeaveUlElement,
          );
          scrollTargetRef.current.removeEventListener(
            'scroll',
            handleScrollTarget,
          );
        }
      };
    }
  }, []);

  return {
    isScrollbarVisible,
    setIsScrollbarVisible,
    scrollTargetRef,
    scrollbarRef,
    scrollThumbRef,
  };
}
