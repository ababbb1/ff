import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemJangBriefcasePaper2({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="입원 예약증" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/jang-briefcase-paper-2-1.png"
            layout="fill"
            alt="jang-paper-2-1"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
