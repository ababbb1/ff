import { XIcon } from '@heroicons/react/outline';
import { PropsWithChildren } from 'react';
import { HintItemProps } from '../../room-hint';

export default function HintItemLayout({
  children,
  setCurrentItem,
}: HintItemProps & PropsWithChildren) {
  return (
    <div className="w-full h-full relative flex justify-center items-center bg-[#d9d9d9]">
      <div
        onClick={() => {
          if (setCurrentItem) {
            setCurrentItem(null);
          }
        }}
        className="absolute top-4 right-4 hover: cursor-pointer"
      >
        <XIcon className="w-6 h-6 2xl:w-8 2xl:h-8 text-gray-700" />
      </div>

      <div>{children}</div>
    </div>
  );
}
