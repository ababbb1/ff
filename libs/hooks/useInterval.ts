import { useCallback, useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, ms: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setInterval(() => callbackRef.current(), ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutRef.current && clearInterval(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [ms, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
