import { useEffect } from 'react';
import { cls } from '../libs/utils';

interface Props {
  children?: React.ReactNode;
  background?: 'none' | 'dark';
  handleClose?: (param?: unknown) => void | unknown;
  isActive: boolean;
}

export default function ModalLayout({
  children,
  background = 'none',
  handleClose,
  isActive,
}: Props) {
  useEffect(() => {
    if (isActive) {
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: hidden;
      width: 100%;`;
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [isActive]);

  return (
    <div
      onClick={e => {
        if (e.target !== e.currentTarget) return;
        if (handleClose) handleClose();
      }}
      className={cls(
        background === 'dark' ? 'bg-[#000000e6]' : '',
        'fixed top-0 left-0 w-screen flex h-screen justify-center items-center',
        isActive ? 'opacity-100 z-50' : 'opacity-0 -z-10',
      )}
    >
      <div
        className={`transition-all duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0 translate-y-3'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
