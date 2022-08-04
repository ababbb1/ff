import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemSonDiary({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="일기장" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[31%] h-[45%] relative">
          <Image
            src="/assets/map/son-diary.png"
            layout="fill"
            alt="newspaper"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="break-words">
            최근 장세민이
            <br />
            유산의 절반을 물려줄 거라고
            <br />
            말했다고 적혀 있다.
          </p>
        </div>
      </div>
    </HintItemLayout>
  );
}
