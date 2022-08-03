import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkPaper1({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="입양 확인서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/park-paper-1-1.png"
            layout="fill"
            alt="park-paper-1-1"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
