import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemHongVitamin({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="비타민K" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/vitamin-label.png"
            layout="fill"
            alt="vitamin"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
