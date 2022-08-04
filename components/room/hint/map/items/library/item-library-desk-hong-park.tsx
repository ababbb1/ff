import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibraryDeskHongPark({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout
      title="홍변호와 박케어 커플사진"
      setCurrentItem={setCurrentItem}
    >
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[40%] h-[40%] relative">
          <Image src="/assets/map/hong-park-wide.png" layout="fill" alt="RC" />
        </div>
      </div>
    </HintItemLayout>
  );
}
