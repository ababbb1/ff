import Image from 'next/image';
import { SectionComponentProps } from '../room-hint';
import SectionLayout from './section-layout';

export default function LivingroomSection({
  setCurrentItem,
}: SectionComponentProps) {
  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div className="w-[10%] h-[10%] absolute z-[4] left-[9.5%] top-[52%]">
          <Image
            src="/assets/map/RC-pictogram.png"
            layout="fill"
            alt="RC-pictogram"
          />
        </div>
        <div className="w-[36%] h-[40%] absolute z-[5] left-[14%] top-[25%]">
          <Image src="/assets/map/sofa.png" layout="fill" alt="sofa" />
        </div>

        <div className="w-[10%] h-[27%] absolute z-[4] right-[8%] top-[36%]">
          <Image src="/assets/map/pot-2.png" layout="fill" alt="pot" />
        </div>

        <div className="w-[6%] h-[12%] absolute z-[4] right-[36%] top-[38%]">
          <Image
            src="/assets/map/daily-schedule.png"
            layout="fill"
            alt="daily-schedule"
          />
        </div>

        <div className="w-[10%] h-[12%] absolute z-[4] right-[20%] top-[7%]">
          <Image src="/assets/map/clock.png" layout="fill" alt="clock" />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
