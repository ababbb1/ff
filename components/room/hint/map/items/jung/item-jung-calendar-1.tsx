import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemJungCalendar1({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="달력" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[31%] h-[45%] relative">
          <Image
            src="/assets/map/jung-calendar-1.png"
            layout="fill"
            alt="newspaper"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="break-words">
            1월 ~ 4월 일정한 주기로
            <br />
            오빠와의 데이트라고 적혀있다.
          </p>
        </div>
      </div>
    </HintItemLayout>
  );
}
