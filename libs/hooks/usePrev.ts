import { useRef } from 'react';

export default function usePrev<T>(value: T) {
  const currentRef = useRef<T>(value);
  const prevRef = useRef<T>();

  if (currentRef.current !== value) {
    prevRef.current = currentRef.current;
    currentRef.current = value;
  }

  return prevRef.current;
}
