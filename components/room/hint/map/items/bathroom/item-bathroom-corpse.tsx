import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemBathroomCorpse({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="피해자 상태" setCurrentItem={setCurrentItem}>
      <div className="flex gap-20 w-full h-full justify-center items-center">
        <div className="w-[15%] aspect-square relative">
          <Image src="/assets/map/mosaic.jpg" layout="fill" alt="corpse" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <span className="font-bold">특이사항</span>
          <ul className="list-disc">
            <li>반신욕 중 사망</li>
            <li>오른발 뒤꿈치의 화상흔</li>
            <li>물이 다 빠져 있었음</li>
          </ul>
        </div>
      </div>
    </HintItemLayout>
  );
}
