import { useEffect, useRef, useState } from 'react';

export default function usePopup() {
  const popupButtonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleClickPopupButton = () => {
    setIsActive(prev => !prev);
  };

  const onClickDocument = (e: MouseEvent) => {
    console.log(e.target);
    if (popupButtonRef.current && popupRef.current) {
      if (
        !e.composedPath().includes(popupButtonRef.current) &&
        !e.composedPath().includes(popupRef.current)
      ) {
        setIsActive(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickDocument);
    return () => document.removeEventListener('click', onClickDocument);
  }, []);

  return {
    popupButtonRef,
    popupRef,
    isActive,
    setIsActive,
    handleClickPopupButton,
  };
}
