import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';
import ItemParkDrawer from './items/park/item-park-drawer';
import ItemParkDesk from './items/park/item-park-desk';
import ItemParkBriefCase from './items/park/item-park-briefcase';
import ItemParkBin from './items/park/item-park-bin';

export default function ParkSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[22%] h-[58%] absolute z-[4] left-[7%] top-[8%]">
          <Image src="/assets/map/closet.png" layout="fill" alt="closet" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-drawer',
                component: ItemParkDrawer,
              });
            }
          }}
          className="w-[17.5%] h-[7.95%] absolute z-[5] left-[9.2%] top-[52.22%] hover:cursor-pointer"
        >
          <Image src="/assets/map/drawer.png" layout="fill" alt="drawer" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-desk',
                component: ItemParkDesk,
              });
            }
          }}
          className="w-[25%] h-[43%] absolute z-[4] left-[32%] top-[22%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/desk-with-computer.png"
            layout="fill"
            alt="desk-with-computer"
          />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-bin',
                component: ItemParkBin,
              });
            }
          }}
          className="w-[5%] h-[14%] absolute z-[4] right-[37%] top-[50%] hover:cursor-pointer"
        >
          <Image src="/assets/map/bin.png" layout="fill" alt="bin" />
        </div>

        <div className="w-[20%] h-[27%] absolute z-[4] right-[7%] top-[40%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="bed" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'park-briefcase',
                component: ItemParkBriefCase,
              });
            }
          }}
          className="w-[12%] h-[3%] absolute z-[5] right-[11%] top-[63.5%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/briefcase.png"
            layout="fill"
            alt="briefcase"
          />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
