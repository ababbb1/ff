import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemHongBox({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="서재 옆 접힌 박스" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[50%] h-[50%] relative">
          <Image src="/assets/map/hong-box.png" layout="fill" alt="box" />
        </div>
      </div>
    </HintItemLayout>
  );
}
