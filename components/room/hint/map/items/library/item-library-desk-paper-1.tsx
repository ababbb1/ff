import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibraryDeskPaper1({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="양손님 이력서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/library-desk-paper-1-1.png"
            layout="fill"
            alt="library-desk-paper-1-1"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
