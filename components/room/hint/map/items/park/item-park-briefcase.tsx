import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemParkResume from './item-park-resume';
import ItemParkWithDaughter from './item-park-with-daughter';

export default function ItemParkBriefCase({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="가방" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-resume',
                component: ItemParkResume,
              });
            }
          }}
          className="hover:cursor-pointer"
        >
          <img
            src="/assets/map/park-briefcase-paper.png"
            className="object-cover"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-with-daughter',
                component: ItemParkWithDaughter,
              });
            }
          }}
          className="hover:cursor-pointer"
        >
          <img
            src="/assets/map/park-with-daughter-wide.png"
            className="object-cover"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
