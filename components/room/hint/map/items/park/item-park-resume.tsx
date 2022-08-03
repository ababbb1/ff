import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkResume({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="이력서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/park-resume.png"
            layout="fill"
            alt="park-resume"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
