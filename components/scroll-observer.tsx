import React, { useCallback, useEffect, useState } from 'react';

interface ScrollValue {
  scrollX: number;
  scrollY: number;
}

interface Props {
  children: JSX.Element;
}

export const ScrollContext = React.createContext<ScrollValue>({
  scrollX: 0,
  scrollY: 0,
});

export default function ScrollObserver({ children }: Props) {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollX(window.scrollX);
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ scrollX, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
}
