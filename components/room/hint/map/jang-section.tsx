import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';

export default function JangSection({ setCurrentItem }: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[24%] h-[29%] absolute z-[4] left-[50%] top-[40%] -translate-x-[50%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="basket" />
        </div>
        <div className="w-[24%] h-[29%] absolute z-[5] left-[50%] top-[40%] -translate-x-[50%]">
          <Image src="/assets/map/bed.png" layout="fill" alt="basket" />
        </div>
      </div>
    </SectionLayout>
  );
}
