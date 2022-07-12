import { useEffect } from 'react';
import { cls } from '../libs/client/utils';

interface Props {
  children?: React.ReactNode;
  background?: 'none' | 'dark';
  handleClose: (param?: unknown) => void | unknown;
}

export default function ModalLayout({
  children,
  background = 'none',
  handleClose,
}: Props) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: hidden;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div
      onClick={e => {
        if (e.target !== e.currentTarget) return;
        handleClose();
      }}
      className={cls(
        background === 'dark' ? 'bg-[#00000090]' : '',
        'fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center',
      )}
    >
      {children}
    </div>
  );
}
