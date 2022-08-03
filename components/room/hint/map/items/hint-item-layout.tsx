import { XIcon } from '@heroicons/react/outline';
import { HintItemProps } from '../../room-hint';

interface Props extends HintItemProps {
  title: string;
  description?: string;
  children: JSX.Element;
}

export default function HintItemLayout({
  children,
  setCurrentItem,
  title,
}: Props) {
  return (
    <div className="h-full aspect-video flex flex-col bg-[#d9d9d9] relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="w-full h-8 px-2 flex justify-between items-center bg-[#efefef]">
        <div className="w-6 h-6 2xl:w-8 2xl:h-8"></div>
        <span className="font-bold">{title}</span>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem(null);
            }
          }}
          className="hover: cursor-pointer"
        >
          <XIcon className="w-6 h-6 2xl:w-8 2xl:h-8 text-gray-700" />
        </div>
      </div>

      <div className="w-full grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
