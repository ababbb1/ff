import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLivingRoomDailySchedule({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="하루 일과표" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[30%] h-[50%] relative">
          <Image
            src="/assets/map/daily-schedule-detail.png"
            layout="fill"
            alt="daily-schedule"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
