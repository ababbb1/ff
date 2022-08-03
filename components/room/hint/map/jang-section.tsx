import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import ItemJangBriefcase from './items/jang/item-jang-briefcase';
import SectionLayout from './section-layout';

export default function JangSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[24%] h-[31%] absolute z-[4] left-[50%] top-[40%] -translate-x-[50%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="bed" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'jang-briefcase',
                component: ItemJangBriefcase,
              });
            }
          }}
          className="w-[15%] h-[3.5%] absolute z-[5] left-[50%] top-[67%] -translate-x-[50%] hover:cursor-pointer"
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
