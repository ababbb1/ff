import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemYangDesk({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="책상" setCurrentItem={setCurrentItem}>
      <div className="flex flex-col gap-6 w-full h-full justify-center items-center">
        <div className="w-[25%] aspect-video relative">
          <Image
            src="/assets/map/yang-license-1.png"
            layout="fill"
            alt="picture"
          />
        </div>
        <div className="w-[25%] aspect-video relative">
          <Image
            src="/assets/map/yang-license-2.png"
            layout="fill"
            alt="picture"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
