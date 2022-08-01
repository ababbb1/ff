import { useState } from 'react';

export default function useTabs<T>(index: number, allTabs: T[]) {
  if (!allTabs || !Array.isArray(allTabs)) return;

  const [currentIndex, setCurrentIndex] = useState(index);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
}
