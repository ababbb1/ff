import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemBathroomTowel({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="젖어있는 수건" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[40%] h-[40%] relative">
          <Image src="/assets/map/towel.png" layout="fill" alt="towel" />
        </div>
      </div>
    </HintItemLayout>
  );
}
