import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemParkPaper1 from './item-park-paper-1';
import ItemParkPaper2 from './item-park-paper-2';

export default function ItemParkDrawer({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="옷장 서랍" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-paper-1',
                component: ItemParkPaper1,
              });
            }
          }}
          className="hover:cursor-pointer"
        >
          <img src="/assets/map/park-paper-1.png" className="object-cover" />
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
          className="hover:cursor-pointer"
        >
          <img src="/assets/map/park-paper-2.png" className="object-cover" />
        </div>
      </div>
    </HintItemLayout>
  );
}
