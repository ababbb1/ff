import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemJangBriefcasePaper1 from './item-jang-briefcase-paper1';
import ItemJangBriefcasePaper2 from './item-jang-briefcase-paper2';

export default function ItemJangBriefcase({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="가방" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jang-briefcase-paper-1',
                component: ItemJangBriefcasePaper1,
              });
            }
          }}
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/jang-briefcase-paper-1-1.png"
            layout="fill"
            className="object-cover"
            alt="paper"
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
          className="w-[20%] h-[45%] relative hover:cursor-pointer"
        >
          <Image
            src="/assets/map/jang-briefcase-paper-2-1.png"
            layout="fill"
            className="object-cover"
            alt="paper"
          />
        </div>
      </div>
    </HintItemLayout>
  );
}
