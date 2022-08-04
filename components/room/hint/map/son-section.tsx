import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import ItemSonDesk from './items/son/item-son-desk';
import ItemSonRC from './items/son/item-son-RC';
import SectionLayout from './section-layout';

export default function SonSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'son-RC',
                component: ItemSonRC,
              });
            }
          }}
          className="w-[25%] h-[54%] absolute z-[4] left-[9%] top-[14%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/RC-showcase.png"
            layout="fill"
            alt="shocase"
          />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'son-desk',
                component: ItemSonDesk,
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
