import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemBathroomSpeaker({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="전선이 끊긴 스피커" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[40%] h-[40%] relative">
          <Image src="/assets/map/speaker.png" layout="fill" alt="speaker" />
        </div>
      </div>
    </HintItemLayout>
  );
}
