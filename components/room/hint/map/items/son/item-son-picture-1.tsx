import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemSonPicture1({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout
      title="장아들이 어머니와 찍은 사진"
      setCurrentItem={setCurrentItem}
    >
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[60%] h-[50%] relative">
          <Image
            src="/assets/map/son-picture-1.png"
            layout="fill"
            alt="picture"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
