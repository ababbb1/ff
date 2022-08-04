import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import ItemYangCloset from './items/yang/item-yang-closet';
import ItemYangDesk from './items/yang/item-yang-desk';
import SectionLayout from './section-layout';

export default function YangSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'yang-closet',
                component: ItemYangCloset,
              });
            }
          }}
          className="w-[22%] h-[58%] absolute z-[4] left-[12%] top-[8%] hover:cursor-pointer"
        >
          <Image src="/assets/map/closet.png" layout="fill" alt="closet" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'yang-desk',
                component: ItemYangDesk,
              });
            }
          }}
          className="w-[25%] h-[43%] absolute z-[4] left-[40%] top-[22%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/desk-with-computer.png"
            layout="fill"
            alt="desk-with-computer"
          />
        </div>

        <div className="w-[20%] h-[27%] absolute z-[4] right-[9%] top-[38%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="bed" />
        </div>
        <div className="w-[12%] h-[3%] absolute z-[5] right-[13%] top-[61.5%]">
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
