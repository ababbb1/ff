import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkLicense({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="간호조무사 자격증" setCurrentItem={setCurrentItem}>
      <div className="w-[25%] h-[60%] relative">
        <Image
          src="/assets/map/nurse-license.png"
          layout="fill"
          alt="license"
        />
      </div>
    </HintItemLayout>
  );
}
