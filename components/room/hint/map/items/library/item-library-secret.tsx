import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibrarySecret({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="?" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex items-center">
        <div className="flex gap-6 w-full h-[45%] justify-center">
          <div className="w-[20%] h-full relative">
            <Image
              src="/assets/map/secret-1.png"
              layout="fill"
              alt="secret-1"
            />
          </div>
          <div className="w-[20%] h-full relative">
            <Image
              src="/assets/map/secret-2.png"
              layout="fill"
              alt="secret-2"
            />
          </div>
          <div className="w-[20%] h-1/5 relative">
            <Image
              src="/assets/map/secret-4.png"
              layout="fill"
              alt="secret-4"
            />
          </div>
        </div>
      </div>
    </HintItemLayout>
  );
}
