import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemJungCalendar2 from './item-jung-calendar-2';
import ItemJungDiary from './item-jung-diary';
import ItemJungPaper2 from './item-jung-paper-2';

export default function ItemJungDesk({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="작업 책상" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[25%] h-[30%] absolute z-[4] right-[12%] top-[32%]">
          <Image src="/assets/map/monitor.png" layout="fill" alt="monitor" />
        </div>

        <div className="w-[50%] h-[25%] absolute z-[4] left-[50%] -translate-x-[50%] top-[65%]">
          <Image src="/assets/map/pad.png" layout="fill" alt="pad" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-paper-2',
                component: ItemJungPaper2,
              });
            }
          }}
          className="w-[12%] h-[10%] absolute z-[5] left-[31%] top-[73%] hover:cursor-pointer"
        >
          <Image src="/assets/map/jung-paper-2.png" layout="fill" alt="paper" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-diary',
                component: ItemJungDiary,
              });
            }
          }}
          className="w-[12%] h-[20%] absolute z-[5] left-[50%] top-[70%] -translate-x-[50%] hover:cursor-pointer"
        >
          <Image src="/assets/map/jung-diary.png" layout="fill" alt="diary" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-calendar-2',
                component: ItemJungCalendar2,
              });
            }
          }}
          className="w-[12%] h-[20%] absolute z-[5] right-[31%] top-[67%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/jung-calendar-2.png"
            layout="fill"
            alt="calendar"
          />
        </div>

        <div className="w-full h-1/3 bg-white absolute bottom-[5%]"></div>
      </div>
    </HintItemLayout>
  );
}
