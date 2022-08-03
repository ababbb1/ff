import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemJangBriefcasePaper1({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="뇌사 판정 신청서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/jang-briefcase-paper-1-1.png"
            layout="fill"
            alt="jang-paper-1-1"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
