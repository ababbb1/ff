import { useEffect } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencis: any[],
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencis, reset]);
  useEffect(clear, []);
}
