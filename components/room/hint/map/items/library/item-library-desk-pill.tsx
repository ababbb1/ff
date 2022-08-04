import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibraryDeskPill({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="심장질환 약" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[20%] h-[50%] relative">
          <Image src="/assets/map/pill.png" layout="fill" alt="pill" />
        </div>
      </div>
    </HintItemLayout>
  );
}
