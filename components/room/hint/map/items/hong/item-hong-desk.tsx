import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemHongRCPaper from './item-hong-RC-paper';
import ItemHongVitamin from './item-hong-vitamin';

export default function ItemHongDesk({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="작업 책상" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex justify-center items-center">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'hong-vitamin',
                component: ItemHongVitamin,
              });
            }
          }}
          className="w-[5%] h-[12%] absolute z-[4] left-[50%] top-[51%] -translate-x-[50%] hover:cursor-pointer"
        >
          <Image src="/assets/map/vitamin.png" layout="fill" alt="books" />
        </div>

        <div className="w-[25%] h-[30%] absolute z-[4] right-[12%] top-[32%] hover:cursor-pointer">
          <Image src="/assets/map/monitor.png" layout="fill" alt="monitor" />
        </div>

        <div className="w-[50%] h-[25%] absolute z-[4] left-[50%] -translate-x-[50%] top-[65%]">
          <Image src="/assets/map/pad.png" layout="fill" alt="pad" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'hong-RC-paper',
                component: ItemHongRCPaper,
              });
            }
          }}
          className="w-[12%] h-[20%] absolute z-[5] left-[50%] top-[67%] -translate-x-[50%] hover:cursor-pointer"
        >
          <Image src="/assets/map/RC-paper.png" layout="fill" alt="RC-paper" />
        </div>

        <div className="w-full h-1/3 bg-white absolute bottom-[5%]"></div>
      </div>
    </HintItemLayout>
  );
}
