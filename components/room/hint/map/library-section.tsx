import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';

export default function LibrarySection({
  setCurrentItem,
}: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[24%] h-[40%] absolute z-[4] left-[12%] top-[26%]">
          <Image
            src="/assets/map/desk-with-computer.png"
            layout="fill"
            alt="desk"
          />
        </div>

        <div className="w-[9%] h-[16%] absolute z-[4] left-[40%] top-[48%]">
          <Image src="/assets/map/safe.png" layout="fill" alt="safe" />
        </div>

        <div className="w-[30%] h-[60%] absolute z-[4] right-[6%] top-[5%]">
          <Image
            src="/assets/map/bookshelf.png"
            layout="fill"
            alt="bookshelf"
          />
        </div>
        <div className="w-[6%] h-[15%] absolute z-[4] right-[38%] top-[47%]">
          <Image src="/assets/map/pot.png" layout="fill" alt="pot" />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
