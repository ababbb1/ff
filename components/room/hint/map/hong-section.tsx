import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';

export default function HongSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[25%] h-[43%] absolute z-[4] left-[9%] top-[22%]">
          <Image
            src="/assets/map/desk-with-computer.png"
            layout="fill"
            alt="desk-with-computer"
          />
        </div>

        <div className="w-[20%] h-[27%] absolute z-[4] left-[38%] top-[38%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="bed" />
        </div>
        <div className="w-[12%] h-[3%] absolute z-[5] left-[42%] top-[61.5%]">
          <Image
            src="/assets/map/briefcase.png"
            layout="fill"
            alt="briefcase"
          />
        </div>

        <div className="w-[28%] h-[58%] absolute z-[4] right-[5%] top-[5%]">
          <Image
            src="/assets/map/bookshelf.png"
            layout="fill"
            alt="bookshelf"
          />
        </div>
        <div className="w-[2.5%] h-[14%] absolute z-[4] right-[0.4%] top-[48%] rotate-6">
          <Image
            src="/assets/map/folded-box.png"
            layout="fill"
            alt="folded-box"
          />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
