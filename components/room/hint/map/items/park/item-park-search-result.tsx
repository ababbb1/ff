import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemParkSearchResult({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="컴퓨터 검색 기록" setCurrentItem={setCurrentItem}>
      <div className="w-[55%] h-[12%] relative">
        <Image
          src="/assets/map/search-result.png"
          layout="fill"
          alt="search-result"
        />
      </div>
    </HintItemLayout>
  );
}
