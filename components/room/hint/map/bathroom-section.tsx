import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';
import ItemBathroomCorpse from './items/bathroom/item-bathroom-corpse';
import ItemBathroomSpeaker from './items/bathroom/item-bathroom-speaker';
import ItemBathroomWrist from './items/bathroom/item-bathroom-wrist';
import ItemBathroomTowel from './items/bathroom/item-bathroom-towel';

export default function BathRoomSection({
  setCurrentItem,
}: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'bathroom-towel',
                component: ItemBathroomTowel,
              });
            }
          }}
          className="w-[12%] h-[14%] absolute z-[4] right-[4%] top-[51%] hover:cursor-pointer"
        >
          <Image src="/assets/map/basket.png" layout="fill" alt="basket" />
        </div>
        <div className="w-[15%] h-[16%] absolute z-[4] right-[29%] top-[37%]">
          <Image
            src="/assets/map/washstand.png"
            layout="fill"
            alt="washstand"
          />
        </div>

        <div className="h-[3%] w-[28%] absolute z-[4] left-[8%] top-[25%] bg-white"></div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'bathroom-speaker',
                component: ItemBathroomSpeaker,
              });
            }
          }}
          className="w-[9%] h-[11%] absolute z-[5] left-[27%] top-[14.3%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/speaker-pictogram.png"
            layout="fill"
            alt="speaker-pictogram"
          />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'bathroom-corpse',
                component: ItemBathroomCorpse,
              });
            }
          }}
          className="w-[24%] h-[16%] absolute z-[4] left-[20%] top-[40.5%] hover: cursor-pointer"
        >
          <Image src="/assets/map/mosaic.png" layout="fill" alt="mosaic" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'bathroom-wrist',
                component: ItemBathroomWrist,
              });
            }
          }}
          className="w-[12%] h-[14%] absolute z-[5] left-[32%] top-[35%] -rotate-[20deg] hover:cursor-pointer"
        >
          <Image src="/assets/map/wrist.png" layout="fill" alt="wrist" />
        </div>
        <div className="w-[40%] h-[35%] absolute z-[6] left-[7%] top-[50%] -translate-y-[50%] pointer-events-none">
          <Image src="/assets/map/tub.png" layout="fill" alt="tub" />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
