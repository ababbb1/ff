import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemHongRCPaper({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="RC카 설명서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image src="/assets/map/RC-paper.png" layout="fill" alt="RC-paper" />
        </div>
      </div>
    </HintItemLayout>
  );
}
