import { useRef, useEffect } from 'react';

export default function useBrowserEvent(
  eventType: string,
  listener: EventListener,
  options: boolean | AddEventListenerOptions,
) {
  const callbackRef = useRef<EventListener>();
  callbackRef.current = listener;

  useEffect(() => {
    if (callbackRef.current) {
      window.addEventListener(eventType, callbackRef.current, options);
    }
    return () => {
      if (callbackRef.current) {
        window.removeEventListener(eventType, callbackRef.current, options);
      }
    };
  }, [eventType, options]);
}
