import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemHongBriefcasePaper1 from './item-hong-briefcase-paper-1';
import ItemHongBriefcasePaper2 from './item-hong-briefcase-paper-2';

export default function ItemHongBriefcase({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="가방" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'hong-briefcase-paper-1',
                component: ItemHongBriefcasePaper1,
              });
            }
          }}
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/hong-briefcase-paper-1-1.png"
            layout="fill"
            alt="hong-briefcase-paper-1"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'hong-briefcase-paper-2',
                component: ItemHongBriefcasePaper2,
              });
            }
          }}
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/hong-briefcase-paper-2-1.png"
            layout="fill"
            alt="hong-briefcase-paper-2"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
