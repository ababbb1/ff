import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemYangSecret({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="1588 살인사건" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image src="/assets/map/secret-3.png" layout="fill" alt="secret-3" />
        </div>
      </div>
    </HintItemLayout>
  );
}
