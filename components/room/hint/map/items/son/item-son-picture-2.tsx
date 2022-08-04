import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemSonPicture2({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="정손녀와의 커플사진" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[60%] h-[50%] relative">
          <Image
            src="/assets/map/son-picture-2.png"
            layout="fill"
            alt="picture"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
