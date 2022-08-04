export default function MobileWarning() {
  return (
    <div className="text-white relative flex justify-center items-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col w-1/2 h-full items-center justify-center pb-52">
        <img src="/assets/mainpage-logo.webp" alt="logo" />
        <h1 className="font-bold pt-4">모바일 환경에서는</h1>
        <h1 className="font-bold whitespace-nowrap">
          플레이 하실 수 없습니다.
        </h1>
      </div>

      <div className="w-[1920px] h-8 absolute bottom-[38%] left-[50%] -translate-x-[53%] rotate-[15deg]">
        <img src="assets/crime-scene.png" alt="l" className="w-full h-full" />
      </div>
      <div className="w-[1920px] h-8 absolute bottom-[38%] left-[50%] -translate-x-[53%] -rotate-[15deg]">
        <img src="assets/crime-scene.png" alt="l" className="w-full h-full" />
      </div>
    </div>
  );
}
