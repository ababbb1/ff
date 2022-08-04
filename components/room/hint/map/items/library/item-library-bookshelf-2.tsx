import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibraryBookshelf2({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="책장" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[31%] h-[35%] relative">
          <Image src="/assets/map/bulnoriya.png" layout="fill" alt="RC" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">2005년 작품</h1>
          <p className="break-words">
            방화 사건을 소재로 했다.
            <br />
            홍변호가 겪은 화재와 비슷한 내용이다.
          </p>
        </div>
      </div>
    </HintItemLayout>
  );
}
