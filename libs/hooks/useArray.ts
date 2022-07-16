import { useState } from 'react';

export default function useArray<T>(defaultArray: T[]) {
  const [array, setArray] = useState(defaultArray);

  const push = (item: T) => {
    setArray(prev => [...prev, item]);
  };

  const filter = (
    predicate: (value: T, index: number, array: T[]) => unknown,
  ) => {
    setArray(prev => prev.filter(predicate));
  };

  const update = (index: number, newItem: T) => {
    setArray(prev => [
      ...prev.slice(0, index),
      newItem,
      ...prev.slice(index + 1, prev.length - 1),
    ]);
  };

  const remove = (index: number) => {
    setArray(prev => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length - 1),
    ]);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, setArray, push, filter, update, remove, clear };
}
