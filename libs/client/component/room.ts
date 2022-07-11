import { HistoryEvents } from 'swiper/types';

export const preventUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
};
