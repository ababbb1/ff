import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemBathroomWrist({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="특이한 화상 흉터" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[40%] h-[40%] relative">
          <Image src="/assets/map/wrist.png" layout="fill" alt="wrist" />
        </div>
      </div>
    </HintItemLayout>
  );
}
