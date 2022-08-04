import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import ItemJungBag from './items/jung/item-jung-bag';
import ItemJungDesk from './items/jung/item-jung-desk';
import SectionLayout from './section-layout';

export default function JungSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[22%] h-[54%] absolute z-[4] left-[9%] top-[12%]">
          <Image src="/assets/map/showcase.png" layout="fill" alt="shocase" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-bag',
                component: ItemJungBag,
              });
            }
          }}
          className="absolute top-[16%] left-[16%] w-[8%] h-[14%] z-[5] hover:cursor-pointer"
        ></div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jung-desk',
                component: ItemJungDesk,
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

        <div className="w-[20%] h-[27%] absolute z-[4] right-[7%] top-[40%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="bed" />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
