import { useState } from 'react';

export type UseArrayPush<T> = (item: T) => void;
export type UseArrayPop = () => void;
export type UseArrayMap<T> = (
  fn: (value: T, index: number, array: T[]) => T,
) => void;
export type UseArrayFilter<T> = (
  predicate: (value: T, index: number, array: T[]) => unknown,
) => void;
export type UseArrayInsert<T> = (index: number, newItem: T) => void;
export type UseArrayRemove = (index: number) => void;
export type UseArrayClear = () => void;

export default function useArray<T>(defaultArray: T[]) {
  const [array, setArray] = useState(defaultArray);

  const push: UseArrayPush<T> = item => {
    setArray(prev => [...prev, item]);
  };

  const pop: UseArrayPop = () => {
    setArray(prev => prev.slice(0, prev.length - 2));
  };

  const map: UseArrayMap<T> = fn => {
    setArray(prev => prev.map(fn));
  };

  const filter: UseArrayFilter<T> = predicate => {
    setArray(prev => prev.filter(predicate));
  };

  const insert: UseArrayInsert<T> = (index, newItem) => {
    setArray(prev => [
      ...prev.slice(0, index),
      newItem,
      ...prev.slice(index + 1, prev.length - 1),
    ]);
  };

  const remove: UseArrayRemove = index => {
    setArray(prev => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length - 1),
    ]);
  };

  const clear: UseArrayClear = () => {
    setArray([]);
  };

  return { array, setArray, push, pop, map, filter, insert, remove, clear };
}
