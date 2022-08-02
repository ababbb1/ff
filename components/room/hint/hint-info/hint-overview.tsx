import { Dispatch, SetStateAction } from 'react';
import useRoomContext from '../../../../libs/hooks/room/useRoomContext';
import { HintInfoContentItem } from '../../../../libs/types/game';
import HintInfoContent from './hint-info-content';
import { PreviewContentType } from './hint-preview';

interface Props {
  setContent?: Dispatch<SetStateAction<PreviewContentType>>;
  savedIndex?: number;
}

const Description1 = (
  <div key={1} className="w-full h-full flex">
    <div className="p-16 2xl:p-20 h-full">
      <h1 className="font-bold text-xl 2xl:text-2xl whitespace-nowrap">
        대저택에서 발생한
        <br />
        미스터리한 살인사건
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-14 2xl:py-20 h-full grow flex flex-col gap-8 2xl:gap-10">
      <p className="leading-7 2xl:leading-9">
        2017년 6월 23일 새벽
        <br />
        서울 외곽에 위치한 대저택의 욕실에서
        <br />
        날카로운 비명이 울려 퍼진다.
      </p>
      <p className="leading-7 2xl:leading-9">
        욕조 안에 쓰러진 모습으로 간병인에 의해 발견된 피해자는
        <br />
        대저택의 주인이자 추리소설계의 거장으로 불리는 장세민 작가.
        <br />
        사체 발견 당시, 특별한 외상은 보이지 않았는데...
      </p>
      <p className="leading-7 2xl:leading-9">
        사건 현장을 둘러본 탐정은
        <br />
        사망 추정시각, 대저택에 머물고 있던 5명의 용의자를 소환한다.
        <br />
        유언장 공표를 하루 앞둔 채 싸늘한 주검으로 발견된 장세민
        <br />
        과연 그를 죽음에 이르게 한 범인은 누구인가
      </p>
    </div>
  </div>
);
const Description2 = (
  <div key={2} className="w-full h-full flex">
    <div className="p-16 2xl:p-20 h-full">
      <h1 className="font-bold text-xl 2xl:text-2xl whitespace-nowrap">
        피해자 X 장세민
        <br />
        (남, 70세)
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-14 2xl:py-20 h-full grow flex flex-col gap-8 2xl:gap-10">
      <p className="leading-7 2xl:leading-9">
        23년 전 발표한 추리소설 &lt;1588 살인사건&gt; 이
        <br />
        베스트셀러가 되면서 스타작가로 등극했다.
      </p>
      <p className="leading-7 2xl:leading-9">
        이후 발표하는 소설마다 히트를 치며
        <br />
        저작권료 등 막대한 재산을 보유하고 있던
        <br />
        추리소설계 거장으로 불리고 있다.
      </p>
    </div>
  </div>
);

export default function HintOverview({ setContent, savedIndex }: Props) {
  const [{ roles }] = useRoomContext();

  const items: HintInfoContentItem[] = [
    {
      title: '사건개요',
      index: 1,
      roleInfo: roles[5],
      description: Description1,
      prevButtonHandler: null,
      nextButtonHandler: null,
    },
    {
      title: '장세민',
      index: 1,
      roleInfo: roles[5],
      description: Description2,
      prevButtonHandler: null,
      nextButtonHandler: setContent
        ? () => setContent({ name: 'characters', index: 0 })
        : null,
    },
  ];

  return (
    <HintInfoContent
      {...{ theme: 'white', items, savedIndex: savedIndex || 0 }}
    >
      content
    </HintInfoContent>
  );
}
