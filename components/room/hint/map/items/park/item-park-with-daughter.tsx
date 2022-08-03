import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkWithDaughter({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="박예쁜과 찍은 사진" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[60%] h-[70%] relative">
          <Image
            src="/assets/map/park-with-daughter-wide.png"
            layout="fill"
            alt="park-resume"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
