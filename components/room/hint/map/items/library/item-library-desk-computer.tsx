import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibraryDeskComputer({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="컴퓨터 자료" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[20%] h-[45%] relative">
          <Image
            src="/assets/map/library-desk-computer-paper-1.png"
            layout="fill"
            alt="library-desk-computer-paper-1"
          />
        </div>
        <div className="w-[20%] h-[45%] relative">
          <Image
            src="/assets/map/library-desk-computer-paper-2.png"
            layout="fill"
            alt="library-desk-computer-paper-2"
          />
        </div>
        <div className="w-[20%] h-[45%] relative">
          <Image
            src="/assets/map/library-desk-computer-paper-3.png"
            layout="fill"
            alt="library-desk-computer-paper-3"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
