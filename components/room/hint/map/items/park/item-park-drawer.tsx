import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemParkPaper1 from './item-park-paper-1';
import ItemParkPaper2 from './item-park-paper-2';

export default function ItemParkDrawer({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="옷장 서랍" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-paper-1',
                component: ItemParkPaper1,
              });
            }
          }}
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/park-paper-1-1.png"
            layout="fill"
            className="object-cover"
            alt="paper"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-paper-2',
                component: ItemParkPaper2,
              });
            }
          }}
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/park-paper-2-1.png"
            layout="fill"
            className="object-cover"
            alt="paper"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
