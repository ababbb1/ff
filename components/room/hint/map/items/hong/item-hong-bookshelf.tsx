import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemHongBookshelfNewspaper from './item-hong-bookshelf-newspaper';

export default function ItemHongBookshelf({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="책장" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full relative">
        <div className="w-[32%] h-[65%] absolute left-[25%] top-[15%]">
          <Image
            src="/assets/map/hong-bookshelf-books.png"
            layout="fill"
            alt="books"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'hong-bookshelf-newspaper',
                component: ItemHongBookshelfNewspaper,
              });
            }
          }}
          className="w-[20%] h-[40%] absolute right-[26.5%] top-[35%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/hong-bookshelf-newspaper.png"
            layout="fill"
            alt="newspaper"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
