import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemJungDiary({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="육아수첩" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[50%] h-[70%] relative">
          <Image src="/assets/map/jung-diary.png" layout="fill" alt="paper" />
        </div>
      </div>
    </HintItemLayout>
  );
}
