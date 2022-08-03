import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkDiary({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="일기장" setCurrentItem={setCurrentItem}>
      <div className="w-[55%] h-[60%] relative">
        <Image src="/assets/map/park-diary.png" layout="fill" alt="diary" />
      </div>
    </HintItemLayout>
  );
}
