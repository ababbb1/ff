import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibrarySafe({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="금고" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[20%] h-[45%] relative">
          <Image
            src="/assets/map/safe-paper-1.png"
            layout="fill"
            alt="safe-paper-1"
          />
        </div>
        <div className="w-[20%] h-[45%] relative">
          <Image
            src="/assets/map/safe-paper-2.png"
            layout="fill"
            alt="safe-paper-2"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
