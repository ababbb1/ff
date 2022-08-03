import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';
import ItemSpeaker from './items/bathroom/item-speaker';

export default function BathRoomSection({
  setCurrentItem,
}: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[12%] h-[14%] absolute z-[4] right-[2%] top-[51%]">
          <Image src="/assets/map/basket.png" layout="fill" alt="basket" />
        </div>
        <div className="w-[15%] h-[16%] absolute z-[4] right-[27%] top-[37%]">
          <Image
            src="/assets/map/washstand.png"
            layout="fill"
            alt="washstand"
          />
        </div>

        <div className="h-[3%] w-[28%] absolute z-[4] left-[6%] top-[25%] bg-white"></div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({ name: 'speaker', component: ItemSpeaker });
            }
          }}
          className="w-[9%] h-[11%] absolute z-[5] left-[25%] top-[14.3%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/speaker-pictogram.png"
            layout="fill"
            alt="speaker-pictogram"
          />
        </div>

        <div className="w-[24%] h-[16%] absolute z-[4] left-[18%] top-[40.5%]">
          <Image src="/assets/map/mosaic.png" layout="fill" alt="mosaic" />
        </div>
        <div className="w-[12%] h-[14%] absolute z-[5] left-[31%] top-[35%] -rotate-[20deg]">
          <Image src="/assets/map/wrist.png" layout="fill" alt="wrist" />
        </div>
        <div className="w-[40%] h-[35%] absolute z-[6] left-[5%] top-[50%] -translate-y-[50%]">
          <Image src="/assets/map/tub.png" layout="fill" alt="tub" />
        </div>
      </div>
    </SectionLayout>
  );
}
