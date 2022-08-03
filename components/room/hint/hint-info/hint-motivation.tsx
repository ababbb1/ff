import { RoleInfo } from '../../../../libs/types/game';
import HintInfoContent from './hint-info-content';
import HintInfoLayout from './hint-info-layout';

interface Props {
  roleInfo: RoleInfo;
  closeButtonHandler: () => void;
}

const descriptions = [
  <div key={1} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자01
        <br />X 장아들
      </h1>
    </div>
    <div className="text-sm 2xl:text-base pt-16 pl-10 2xl:pt-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-6 2xl:gap-8">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          몇달 전, 장세민이 장아들을 친아들이라고 데려와
        </p>
        <p className="leading-6 2xl:leading-7">
          유산의 50%를 물려주겠다고 말해 그는 기대를 하고 있었다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="">
          그러나 만약 장세민이 장아들을 친아들이라고 데려온 것이 사실은
        </p>
        <p className="leading-6 2xl:leading-7">
          <strong className="bg-animate-layout-border">
            심장 이식을 위한 작업
          </strong>
          이었다는 걸 알았다면 장세민을 살해할 수 있다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          <strong>취미</strong>&nbsp;:&nbsp;RC카 모으기
        </p>
        <p className="leading-6 2xl:leading-7">
          <strong>예전 직업</strong>&nbsp;:&nbsp;월미도 디스코팡팡 DJ
        </p>
      </div>
      <div className="flex p-6 2xl:p-8 gap-4 h-52 2xl:h-64">
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              취미
            </span>
            <span className="whitespace-nowrap text-sm">RC카 모으기</span>
          </div>
        </div>
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              예전직업
            </span>
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-sm text-center">
                윌미도
              </span>
              <span className="whitespace-nowrap text-sm text-center">
                디스코팡팡DJ
              </span>
            </div>
          </div>
        </div>
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              관계
            </span>
            <span className="whitespace-nowrap text-sm">
              정손녀와 전 연인 관계
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div key={2} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자02
        <br />X 정손녀
      </h1>
    </div>
    <div className="text-sm 2xl:text-base pt-16 pl-10 2xl:pt-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-6 2xl:gap-8">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          사실 정손녀는 장세민의 외손녀가 아닌 박케어의 친딸 박예쁜이다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="">
          장세민의 신용카드로 사치를 부리다 화가난 장세민은 카드 사용을 중지시켜
          압수 했으나,
        </p>
        <p className="leading-6 2xl:leading-7">
          참지 못한 정손녀는 결국 사채까지 손을대 빚이 생겨 오늘 갚아야할 위기에
          있었다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          실제 외손녀가 아니라는 사실을 알게 된 장세민이 정손녀에게 유산을
        </p>
        <p className="leading-6 2xl:leading-7">
          모두 물려주겠다던 기존의 유언장을 폐기하고, 아무것도 물려주지 않겠다고
          한
        </p>
        <p className="leading-6 2xl:leading-7">
          새 유언장을 정손녀가 발견했다면 살인을 저지를 수 있다.
        </p>
      </div>
      <div className="flex p-6 2xl:p-8 gap-4 h-52 2xl:h-64">
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              관계
            </span>
            <span className="whitespace-nowrap text-sm">
              장아들과 전 연인 관계
            </span>
          </div>
        </div>
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              관계
            </span>
            <span className="whitespace-nowrap text-sm">박케어와 가족</span>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div key={3} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자03
        <br />X 박케어
      </h1>
    </div>
    <div className="text-sm 2xl:text-base pt-16 pl-10 2xl:pt-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-6 2xl:gap-8">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          궁극적으로 장세민의 재산을 차지하기 위해 산부인과에 다니며 원래
        </p>
        <p className="leading-6 2xl:leading-7">
          손녀와 자신의 친딸 박예쁜(정손녀)을 바꿔치기 하였다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="">
          장세민의 외손녀로 위장시킨 박케어는 자신도 15년 동안 장세민의 간병을
          하며
        </p>
        <p className="leading-6 2xl:leading-7">
          장세민과 혼인신고를 하려고 했지만 장세민은 계속해서 혼인신고를 미뤄
          왔다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          그러다 어제 원래 자신의 친딸인 박예쁜(정손녀)이 진짜 손녀가
        </p>
        <p className="leading-6 2xl:leading-7">
          아니라는 사실과 본인이 홍변호와 사귀고 있다는 사실을
        </p>
        <p className="leading-6 2xl:leading-7">장세민에게 들켰다.</p>
      </div>
      <div className="flex p-6 2xl:p-8 gap-4 h-52 2xl:h-64">
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              살인경력
            </span>
            <p className="whitespace-nowrap text-sm text-center">
              박예쁜을 의심하던
              <br />
              원래 부모들을
              <br />
              <strong>교통사고로</strong>
              <br />
              <strong>위장시켜 살해</strong>했다
            </p>
          </div>
        </div>
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              예전 직업
            </span>
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-sm text-center">
                산부인과
              </span>
              <span className="whitespace-nowrap text-sm text-center">
                간호조무사
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div key={4} className="w-full h-full flex text-white">
    <div className="p-16 2xl:p-20 h-full">
      <p className="font-bold text-xl 2xl:text-2xl whitespace-nowrap">
        당신은
        <br />
        범인입니다.
        <br />
        <br />
        용의자에게
        <br />
        들키지 않게
        <br />
        단서를
        <br />
        조작하세요
      </p>
    </div>
    <div className="text-sm 2xl:text-base py-14 2xl:py-20 h-full grow flex flex-col gap-8 2xl:gap-10">
      <p className="leading-7 2xl:leading-9">
        어린 시절부터 보육원에서 자란 홍변호.
        <br />
        그곳에서 만난 친구 김붕우와 친형제나 다름없이 지냈고,
        <br />
        서로가 열심히 공부하여 각자 의대생, 법대생이 된 그들은
        <br />
        꿈을 키우며 함께 살았는데...
      </p>
      <p className="leading-7 2xl:leading-9">
        어느 날 집에 가던 중 수상한 남자와 부딪힌 홍변호
        <br />
        팔에 특이한 모양의 화상을 입은 수상한 남자는 급히 도망갔다.
      </p>
      <p className="leading-7 2xl:leading-9">
        불안한 마음에 황급히 집으로 돌아와 보니 이미 화염에 휩싸인 집.
        <br />
        그렇게 가족이나 다름없던 친구 김붕우를 잃고 만다.
      </p>
      <p className="leading-7 2xl:leading-9">
        경찰에게 수상한 남자에 대해 증언하지만
        <br />
        단순 화재 사건으로 수사 종결된다.
      </p>
    </div>
  </div>,
  <div key={5} className="w-full h-full flex">
    <div className="py-16 px-10 2xl:px-12 2xl:py-20 h-full">
      <h1 className="font-bold text-2xl 2xl:text-3xl whitespace-nowrap">
        용의자05
        <br />X 양손님
      </h1>
    </div>
    <div className="text-sm 2xl:text-base pt-16 pl-10 2xl:pt-20 pr-8 2xl:pr-8 h-full grow flex flex-col gap-6 2xl:gap-8">
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="leading-6 2xl:leading-7">
          대리운전 기사였던 양손님은 누군가에 의해 과거 살인 누명을 쓰고
        </p>
        <p className="leading-6 2xl:leading-7">
          25년을 감옥에서 보내던 중 &lt;1588 살인사건&gt;을 보다 그 내용이
        </p>
        <p className="leading-6 2xl:leading-7">
          마치 자신이 살인 누명을 썼을 당시의 상황과 흡사한 것을 깨닫고
        </p>
        <p className="leading-6 2xl:leading-7">
          장세민이 범인이라고 의심하게 되었다.
        </p>
      </div>
      <div className="pl-2 2xl:pl-4 flex flex-col gap-1 2xl:gap-2">
        <p className="">
          출소 후 신작의 자문을 위해 교도관이라고 속여 장세민에게 접근한
        </p>
        <p className="leading-6 2xl:leading-7">
          그는 사건 당일 서재에서 자신에게 누명을 씌웠던 범인이 장세민이라는
        </p>
        <p className="leading-6 2xl:leading-7">
          것을 발견하면서 의심을 확신으로 굳혔다.
        </p>
      </div>
      <div className="flex p-6 2xl:p-8 gap-4 h-52 2xl:h-64">
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              자격증
            </span>
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-sm text-center">
                전기공사기사
              </span>
              <span className="whitespace-nowrap text-sm text-center">
                용접기사
              </span>
            </div>
          </div>
        </div>
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              예전직업
            </span>
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-sm text-center">
                대리운전기사
              </span>
            </div>
          </div>
        </div>
        <div className="h-full aspect-square rounded-md border-2 border-black bg-white p-2">
          <div className="h-full aspect-square rounded-md border-2 border-black relative flex justify-center items-center">
            <span className="absolute top-3 left-[50%] -translate-x-[50%] font-semibold">
              범행계획쪽지
            </span>
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-sm text-center">
                장세민의
              </span>
              <span className="whitespace-nowrap text-sm text-center">
                서재 책장 뒤에서
              </span>
              <span className="whitespace-nowrap text-sm text-center">
                발견하고 뜯어 온 것
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
];

export default function HintMotivation({
  roleInfo,
  closeButtonHandler,
}: Props) {
  const items = [
    {
      title: '',
      roleInfo,
      description: descriptions[roleInfo.id - 1],
      index: 0,
      prevButtonHandler: null,
      nextButtonHandler: null,
    },
  ];

  return (
    <HintInfoLayout
      title={
        roleInfo.id === 4 ? '범인 스토리 텔링' : `${roleInfo.name} 동기적 측면`
      }
      theme={roleInfo.id === 4 ? 'black' : 'white'}
      closeButtonHandler={closeButtonHandler}
    >
      <HintInfoContent
        items={
          roleInfo.id === 4
            ? [
                {
                  ...items[0],
                  roleInfo: { ...items[0].roleInfo, kind: '범인' },
                },
              ]
            : items
        }
        theme={roleInfo.id === 4 ? 'black' : 'white'}
      />
    </HintInfoLayout>
  );
}
