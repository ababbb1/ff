import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemSonDiary from './item-son-diary';
import ItemSonPaper1 from './item-son-paper-1';
import ItemSonPicture1 from './item-son-picture-1';
import ItemSonPicture2 from './item-son-picture-2';

export default function ItemSonDesk({ setCurrentItem }: HintItemProps) {
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
                name: 'son-paper-1',
                component: ItemSonPaper1,
              });
            }
          }}
          className="w-[8%] h-[15%] absolute z-[5] left-[32%] top-[70%] hover:cursor-pointer"
        >
          <Image src="/assets/map/son-paper-1.png" layout="fill" alt="paper" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'son-picture-1',
                component: ItemSonPicture1,
              });
            }
          }}
          className="w-[8%] h-[10%] absolute z-[5] left-[43%] top-[70%] -rotate-[30deg] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/son-picture-1.png"
            layout="fill"
            alt="picture"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'son-picture-2',
                component: ItemSonPicture2,
              });
            }
          }}
          className="w-[8%] h-[10%] absolute z-[6] left-[48%] top-[73%] rotate-[15deg] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/son-picture-2.png"
            layout="fill"
            alt="picture"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'son-diary',
                component: ItemSonDiary,
              });
            }
          }}
          className="w-[10%] h-[18%] absolute z-[5] right-[32%] top-[70%] hover:cursor-pointer"
        >
          <Image src="/assets/map/son-diary.png" layout="fill" alt="diary" />
        </div>

        <div className="w-full h-1/3 bg-white absolute bottom-[5%]"></div>
      </div>
    </HintItemLayout>
  );
}
