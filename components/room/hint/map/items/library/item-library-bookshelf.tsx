import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemLibraryBookshelf1 from './item-library-bookshelf-1';
import ItemLibraryBookshelf2 from './item-library-bookshelf-2';

export default function ItemLibraryBookshelf({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="작업 책상" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[50%] h-[45%] absolute z-[4] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Image
            src="/assets/map/library-bookshelf.png"
            layout="fill"
            alt="bookshelf"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-bookshelf-1',
                component: ItemLibraryBookshelf1,
              });
            }
          }}
          className="w-[3%] h-[20%] absolute z-[4] left-[42%] top-[27.5%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/library-bookshelf-1.png"
            layout="fill"
            alt="bookshelf1"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-bookshelf-2',
                component: ItemLibraryBookshelf2,
              });
            }
          }}
          className="w-[9.1%] h-[5.5%] absolute z-[4] right-[41%] top-[42%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/library-bookshelf-2.png"
            layout="fill"
            alt="bookshelf2"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
