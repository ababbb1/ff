import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkBin({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="쓰래기통" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/marriage-certificate.png"
            layout="fill"
            alt="marriage-certificate"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
