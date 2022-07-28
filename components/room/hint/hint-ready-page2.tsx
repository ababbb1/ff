export default function HintReadyPage2() {
  return (
    <div className="w-full h-full flex">
      <div className="h-full w-[35%] border-r border-black flex flex-col px-10">
        <div className="w-full h-2/3 border-b-2 border-black flex justify-center items-center px-10">
          <div className="w-full aspect-square border-2 border-black rounded-lg"></div>
        </div>
        <div className="w-full h-[35%] flex flex-col px-20 pt-8 gap-3">
          <span className="font-semibold text-2xl">장세민 (피해자)</span>
          <span className="text-xl">성별 - 남성</span>
          <span className="text-xl">나이 - 70세</span>
          <span className="text-xl">직업 - 추리소설 작가</span>
        </div>
      </div>
      <div className="h-full w-[51%] border-r border-black px-10 py-14 tracking-wide flex flex-col gap-8">
        <h1 className="font-bold text-4xl">
          대저택에서 발생한 미스터리한 살인사건
        </h1>
        <p className="text-xl">
          2017년 6월 23일 새벽
          <br />
          서울 외곽에 위치한 대저택의 욕실에서
          <br />
          날카로운 비명이 울려 퍼진다.
        </p>
        <p className="text-xl">
          욕조 안에 쓰러진 모습으로 간병인에 의해 발견된 피해자는
          <br />
          대저택의 주인이자 추리소설계의 거장으로 불리는 장세민 작가.
          <br />
          사체 발견 당시, 특별한 외상은 보이지 않았는데...
        </p>
        <p className="text-xl">
          사건 현장을 둘러본 탐정은
          <br />
          사망 추정 시각, 대저택에 머물고 있던 5명의 용의자를 소환한다.
          <br />
          유언장 공표를 하루 앞둔 채 싸늘한 주검으로 발견된 장세민
          <br />
          과연 그를 죽음에 이르게한 범인은 누구인가
        </p>
      </div>
      <div className="h-full w-[14%] pt-16 flex justify-center">
        <span className="font-bold text-8xl">02</span>
      </div>
    </div>
  );
}
