import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemSonRC({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="RC카" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[60%] h-[50%] relative">
          <Image src="/assets/map/son-RC.png" layout="fill" alt="RC" />
        </div>
      </div>
    </HintItemLayout>
  );
}
