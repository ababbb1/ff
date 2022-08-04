import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemHongGlove({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="서랍" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[50%] h-[60%] relative">
          <Image src="/assets/map/glove.png" layout="fill" alt="glove" />
        </div>
      </div>
    </HintItemLayout>
  );
}
