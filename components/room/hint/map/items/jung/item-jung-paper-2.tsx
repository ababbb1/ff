import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemJungPaper2({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="성형수술 확인서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[50%] h-[50%] relative">
          <Image src="/assets/map/jung-paper-2.png" layout="fill" alt="paper" />
        </div>
      </div>
    </HintItemLayout>
  );
}
