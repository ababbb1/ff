import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemHongBookshelfNewspaper({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="신문" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[31%] h-[35%] relative">
          <Image
            src="/assets/map/newspaper.png"
            layout="fill"
            alt="newspaper"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="break-words">
            2002년 7월 25일 화재로 인해
            <br />
            남자 1명이 사망했다. 피해자의
            <br />
            친구 홍 씨(홍변호)는 팔에 특이한
            <br />
            모양의 화상을 입은 의문의
            <br />
            남성을 목격했다고 한다.
          </p>
        </div>
      </div>
    </HintItemLayout>
  );
}
