import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemJungPaper1({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="사채 빚 독촉장" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[50%] h-[60%] relative">
          <Image src="/assets/map/jung-paper-1.png" layout="fill" alt="paper" />
        </div>
      </div>
    </HintItemLayout>
  );
}
