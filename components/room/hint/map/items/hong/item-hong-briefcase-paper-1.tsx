import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemHongBriefcasePaper1({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout
      title="세민 재단 설립 신청서"
      setCurrentItem={setCurrentItem}
    >
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/hong-briefcase-paper-1-1.png"
            layout="fill"
            alt="hong-briefcase-paper-2-1"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
