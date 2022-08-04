import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemYangPicture({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="여동생과 찍은 사진" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[50%] h-[60%] relative">
          <Image
            src="/assets/map/yang-picture.png"
            layout="fill"
            alt="picture"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
