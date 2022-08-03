import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemParkDiary from './item-park-diary';
import ItemParkLicense from './item-park-license';
import ItemParkSearchResult from './item-park-search-result';

export default function ItemParkDesk({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="작업 책상" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[8%] h-[27%] absolute z-[4] left-[27%] top-[35%]">
          <Image src="/assets/map/park-books.png" layout="fill" alt="books" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-search-result',
                component: ItemParkSearchResult,
              });
            }
          }}
          className="w-[25%] h-[30%] absolute z-[4] left-[50%] -translate-x-[50%] top-[32%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/monitor-off.png"
            layout="fill"
            alt="monitor"
          />
        </div>

        <div className="w-[50%] h-[25%] absolute z-[4] left-[50%] -translate-x-[50%] top-[65%]">
          <Image src="/assets/map/pad.png" layout="fill" alt="pad" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-license',
                component: ItemParkLicense,
              });
            }
          }}
          className="w-[12%] h-[20%] absolute z-[5] left-[37%] top-[67%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/park-desk-paper-1.png"
            layout="fill"
            alt="park-desk-paper"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-diary',
                component: ItemParkDiary,
              });
            }
          }}
          className="w-[12%] h-[20%] absolute z-[5] left-[51%] top-[67%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/park-desk-paper-2.png"
            layout="fill"
            alt="park-desk-paper"
          />
        </div>

        <div className="w-full h-1/3 bg-white absolute bottom-[5%]"></div>
      </div>
    </HintItemLayout>
  );
}
