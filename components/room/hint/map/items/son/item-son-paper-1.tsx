import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemSonPaper1({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="장기 기증 동의서" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[70%] relative">
          <Image
            src="/assets/map/son-paper-1.png"
            layout="fill"
            alt="son-paper-1"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
