import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemLibraryBookshelf1({
  setCurrentItem,
}: HintItemProps) {
  return (
    <HintItemLayout title="책장" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <div className="w-[31%] h-[35%] relative">
          <Image src="/assets/map/1588.png" layout="fill" alt="RC" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            23년 전 발표한 첫 베스트셀러
          </h1>
          <p className="break-words">
            대리운전기사가 어떤 여성을 태우고 쪽지에 적힌
            <br />
            주소로 데려다 달라는 요청을 받고 운전했는데,
            <br />
            알고보니 그 여자는 칼에 찔려 죽은 상태였고
            <br />
            해당 쪽지는 칼을 산 영수증인것으로 밝혀져서
            <br />
            대리기사가 살인 누명을 쓰고 25년 동안
            <br />
            감옥살이를 했다는 것이 주요 내용이다.
          </p>
        </div>
      </div>
    </HintItemLayout>
  );
}
