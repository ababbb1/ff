import { Dispatch, SetStateAction } from 'react';
import useRoomContext from '../../../../libs/hooks/room/useRoomContext';
import { HintInfoContentItem } from '../../../../libs/types/game';
import HintInfoContent from './hint-info-content';
import { PreviewContentType } from './hint-preview';

const descriptions = [
  <div key={1} className="w-full h-full flex">
    <div className="p-16 2xl:p-20 h-full">
      <h1 className="font-bold text-xl 2xl:text-2xl whitespace-nowrap">
        인물관계도
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-14 2xl:py-16 h-full grow flex flex-col gap-8 2xl:gap-10">
      <div className="flex flex-col gap-3">
        <span className="font-semibold 2xl:text-xl">대저택거주</span>
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <div className="w-32 2xl:w-40 aspect-square p-1">
              <img
                src="/assets/characters-jung.png"
                className="w-full h-full"
              />
            </div>
            <div className="font-semibold flex justify-between text-xs 2xl:text-sm">
              <span>
                정손녀
                <br />
                20,여
              </span>
              <span>
                피해자의 손녀
                <br />
                조손관계
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-32 2xl:w-40 aspect-square p-1">
              <img
                src="/assets/characters-park.png"
                className="w-full h-full"
              />
            </div>
            <div className="font-semibold flex justify-between text-xs 2xl:text-sm">
              <span>
                박케어
                <br />
                41,여
              </span>
              <span>
                전문간병인
                <br />
                간병인
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-32 2xl:w-40 aspect-square p-1">
              <img src="/assets/characters-son.png" className="w-full h-full" />
            </div>
            <div className="font-semibold flex justify-between text-xs 2xl:text-sm">
              <span>
                장아들
                <br />
                21,남
              </span>
              <span>
                피해자의 아들
                <br />
                부자관계
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-3">
          <span className="font-semibold 2xl:text-xl">고용관계</span>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-32 2xl:w-40 aspect-square p-1">
                <img
                  src="/assets/characters-hong.png"
                  className="w-full h-full"
                />
              </div>
              <div className="font-semibold flex justify-between text-xs 2xl:text-sm">
                <span>
                  홍변호
                  <br />
                  40,남
                </span>
                <span>
                  개인변호사
                  <br />
                  고용관계
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold 2xl:text-xl">고용관계</span>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-32 2xl:w-40 aspect-square p-1">
                <img
                  src="/assets/characters-yang.png"
                  className="w-full h-full"
                />
              </div>
              <div className="font-semibold flex justify-between text-xs 2xl:text-sm">
                <span>
                  양손님
                  <br />
                  45,남
                </span>
                <span>
                  손님
                  <br />
                  손님
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div key={2} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:py-20 2xl:px-12 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자01
        <br />X 장아들
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-16 pl-10 2xl:py-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-6 2xl:gap-8">
      <div className="pl-3 2xl:pl-4 flex flex-col gap-4 2xl:gap-6">
        <p className="leading-6 2xl:leading-7">
          평생 아버지의 존재를 모르고 살다가
          <br />
          한달 전에서야 만나게 된 아버지
        </p>
        <p className="leading-6 2xl:leading-7">
          &apos;이게 다 무슨 일이랍니까....&apos;
        </p>
        <p className="leading-6 2xl:leading-7">
          한 달 전, 뒤늦게 찾아 대저택에 데려온 피해자의 친아들.
          <br />
          유일한 가족이었던 어머니를 여의고 혈혈단신 고생하다가
          <br />
          대저택의 도련님이 된 현실판 남자 신데렐라
        </p>
      </div>
      <div className="flex flex-col bg-white p-8 pb-16 gap-3">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl 2xl:text-2xl">사망추정시간</span>
          <div className="px-2 py-1 bg-black text-white flex justify-center items-center">
            8/3 AM2:00 ~ 3:30
          </div>
          <span className="font-bold text-xl 2xl:text-2xl">알리바이</span>
        </div>
        <span className="font-semibold">
          &quot; 전 제 방에서 자고 있었는데요...? &quot;
        </span>
      </div>
    </div>
  </div>,
  <div key={3} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자02
        <br />X 정손녀
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-16 pl-10 2xl:py-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-12 2xl:gap-14">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-4 2xl:gap-6">
        <p className="leading-6 2xl:leading-7">
          장아들이 나타나기 전까지는
          <br />
          피해자의 유일한 피붙이였던 외손녀
        </p>
        <p className="leading-6 2xl:leading-7">
          &apos;제 유일한 가족이었죠. 저를 많이 아끼고 예뻐해 주셨는데...&apos;
        </p>
        <p className="leading-6 2xl:leading-7">
          금수저 물고 태어나 허영심과 사치가 심한 부잣집 공주님.
        </p>
      </div>
      <div className="flex flex-col bg-white p-6 2xl:p-8 pb-12 2xl:pb-16 gap-5">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl 2xl:text-2xl">사망추정시간</span>
          <div className="px-2 py-1 bg-black text-white flex justify-center items-center">
            8/3 AM2:00 ~ 3:30
          </div>
          <span className="font-bold text-xl 2xl:text-2xl">알리바이</span>
        </div>
        <span className="font-semibold">
          &quot; 제가 원래 야행성이라 좀 늦게 자는 편이거든요...
          <br />그 시간이면 2층 제 방에서 음악도 듣다 영화도 보다 그러고
          있었어요. &quot;
        </span>
      </div>
    </div>
  </div>,
  <div key={4} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자03
        <br />X 박케어
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-16 pl-10 2xl:py-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-12 2xl:gap-14">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-4 2xl:gap-6">
        <p className="leading-6 2xl:leading-7">
          사체 최초 발견자로 15년째 대저택에서
          <br />
          일하고 있는 전문 간병인
        </p>
        <p className="leading-6 2xl:leading-7">
          &apos;작가님께서 좀 까다로운 편이시라...
          <br />
          그걸 맞출 수 있는 사람은 저뿐이었죠.&apos;
        </p>
        <p className="leading-6 2xl:leading-7">
          피해자의 음식, 건강 등을 전반적으로 케어해 왔음.
        </p>
      </div>
      <div className="flex flex-col bg-white p-6 2xl:p-8 pb-12 2xl:pb-16 gap-5">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl 2xl:text-2xl">사망추정시간</span>
          <div className="px-2 py-1 bg-black text-white flex justify-center items-center">
            8/3 AM2:00 ~ 3:30
          </div>
          <span className="font-bold text-xl 2xl:text-2xl">알리바이</span>
        </div>
        <span className="font-semibold">
          &quot; 작가님께서 항상 2시쯤부터 반신욕을 하시거든요.
          <br />
          저는 나가 있다가 3시쯤 마무리하곤 했는데...
          <br />
          오늘은 평소보다 조금 늦게 3시 반쯤 정리하러 갔더니 이렇게... &quot;
        </span>
      </div>
    </div>
  </div>,
  <div key={5} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자04
        <br />X 홍변호
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-16 pl-10 2xl:py-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-12 2xl:gap-14">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-4 2xl:gap-6">
        <p className="leading-6 2xl:leading-7">
          3년째 일하고 있는 피해자의 개인 변호사
        </p>
        <p className="leading-6 2xl:leading-7">
          &apos;작가님께서 워낙 완벽하신 편이라
          <br />
          저는 서포트해드리는 정도로 돕고 있었고...
          <br />
          신뢰가 두터운 편이었죠. 그런 저를 의심하시는 겁니까?&apos;
        </p>
        <p className="leading-6 2xl:leading-7">
          대저택의 별채에서 머물며 피해자의 법적 사항들을 관리하고 있음.
        </p>
      </div>
      <div className="flex flex-col bg-white p-6 2xl:p-8 pb-12 2xl:pb-16 gap-5">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl 2xl:text-2xl">사망추정시간</span>
          <div className="px-2 py-1 bg-black text-white flex justify-center items-center">
            8/3 AM2:00 ~ 3:30
          </div>
          <span className="font-bold text-xl 2xl:text-2xl">알리바이</span>
        </div>
        <span className="font-semibold">
          &quot; 일찍 자는 타입은 아니라서... 별채에서 일하고 있었습니다. &quot;
        </span>
      </div>
    </div>
  </div>,
  <div key={6} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자05
        <br />X 양손님
      </h1>
    </div>
    <div className="text-sm 2xl:text-base py-16 pl-10 2xl:py-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-12 2xl:gap-14">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-4 2xl:gap-6">
        <p className="leading-6 2xl:leading-7">
          &apos;작가님께서 새로 집필하는 소설 관련해 자문하러 온 손님입니다.
          <br />
          오늘이 떠나는 날이었는데... 하필 저렇게 되시다니...&apos;
        </p>
        <p className="leading-6 2xl:leading-7">
          피해자의 차기작 집필과 자문을 위해
          <br />
          5일 전부터 대저택에 묵고 있던 자문가(?) 손님.
        </p>
      </div>
      <div className="flex flex-col bg-white p-6 2xl:p-8 pb-12 2xl:pb-16 gap-5">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl 2xl:text-2xl">사망추정시간</span>
          <div className="px-2 py-1 bg-black text-white flex justify-center items-center">
            8/3 AM2:00 ~ 3:30
          </div>
          <span className="font-bold text-xl 2xl:text-2xl">알리바이</span>
        </div>
        <span className="font-semibold">
          &quot; 전 그냥 손님방에 있었죠. 그러다 3시 30분에 비명 소리를
          들었고요. &quot;
        </span>
      </div>
    </div>
  </div>,
];

interface Props {
  setContent?: Dispatch<SetStateAction<PreviewContentType>>;
  savedIndex?: number;
}

export default function HintCharacters({ setContent, savedIndex }: Props) {
  const [{ roles }] = useRoomContext();
  const rolesWithoutJang = roles.slice(0, 5);

  const items: HintInfoContentItem[] = Array(6)
    .fill(null)
    .map((_, i) => ({
      title: i === 0 ? '인물관계도' : rolesWithoutJang[i].name,
      index: 2,
      roleInfo: rolesWithoutJang[i],
      description: descriptions[i],
      prevButtonHandler:
        i === 0 && setContent
          ? () => setContent({ name: 'overview', index: 1 })
          : null,
      nextButtonHandler: null,
    }));

  return (
    <HintInfoContent
      {...{ theme: 'white', items, savedIndex: savedIndex || 0 }}
    >
      content
    </HintInfoContent>
  );
}
