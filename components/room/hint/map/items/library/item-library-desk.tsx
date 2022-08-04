import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemLibraryDeskComputer from './item-library-desk-computer';
import ItemLibraryDeskHongPark from './item-library-desk-hong-park';
import ItemLibraryDeskPaper1 from './item-library-desk-paper-1';
import ItemLibraryDeskPill from './item-library-desk-pill';

export default function ItemLibraryDesk({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="작업 책상" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex justify-center items-center">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-desk-pill',
                component: ItemLibraryDeskPill,
              });
            }
          }}
          className="w-[5%] h-[12%] absolute z-[4] left-[27%] top-[51%] hover:cursor-pointer"
        >
          <Image src="/assets/map/pill.png" layout="fill" alt="books" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-desk-computer',
                component: ItemLibraryDeskComputer,
              });
            }
          }}
          className="w-[25%] h-[30%] absolute z-[4] right-[12%] top-[32%] hover:cursor-pointer"
        >
          <Image src="/assets/map/monitor.png" layout="fill" alt="monitor" />
        </div>

        <div className="w-[50%] h-[25%] absolute z-[4] left-[50%] -translate-x-[50%] top-[65%]">
          <Image src="/assets/map/pad.png" layout="fill" alt="pad" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-desk-paper-1',
                component: ItemLibraryDeskPaper1,
              });
            }
          }}
          className="w-[12%] h-[20%] absolute z-[5] left-[37%] top-[67%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/library-desk-paper-1-1.png"
            layout="fill"
            alt="park-desk-paper"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-desk-hong-park',
                component: ItemLibraryDeskHongPark,
              });
            }
          }}
          className="w-[12%] h-[16%] absolute z-[5] left-[51%] top-[69%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/hong-park-wide.png"
            layout="fill"
            alt="park-desk-paper"
          />
        </div>

        <div className="w-full h-1/3 bg-white absolute bottom-[5%]"></div>
      </div>
    </HintItemLayout>
  );
}
