import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemJangBriefcasePaper1 from './item-jang-briefcase-paper1';
import ItemJangBriefcasePaper2 from './item-jang-briefcase-paper2';

export default function ItemJangBriefcase({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="가방" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jang-briefcase-paper-1',
                component: ItemJangBriefcasePaper1,
              });
            }
          }}
          className="hover:cursor-pointer"
        >
          <img
            src="/assets/map/jang-briefcase-paper-1.png"
            className="object-cover"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jang-briefcase-paper-2',
                component: ItemJangBriefcasePaper2,
              });
            }
          }}
          className="hover:cursor-pointer"
        >
          <img
            src="/assets/map/jang-briefcase-paper-2.png"
            className="object-cover"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
