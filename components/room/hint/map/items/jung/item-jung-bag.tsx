import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemJungCalendar1 from './item-jung-calendar-1';
import ItemJungPaper1 from './item-jung-paper-1';

export default function ItemJungBag({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="가방" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-paper-1',
                component: ItemJungPaper1,
              });
            }
          }}
          className="w-[25%] h-[35%] relative hover:cursor-pointer"
        >
          <Image src="/assets/map/jung-paper-1.png" layout="fill" alt="paper" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-calendar-1',
                component: ItemJungCalendar1,
              });
            }
          }}
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/jung-calendar-1.png"
            layout="fill"
            alt="calendar"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
