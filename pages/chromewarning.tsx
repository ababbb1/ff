export default function ChromeWarning() {
  return (
    <div className="text-white relative flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-1/3 h-full items-center justify-center pb-52">
        <img src="/assets/mainpage-logo.webp" alt="logo" />
        <h1 className="font-bold text-2xl">CHROME 브라우저로 접속해주세요.</h1>
      </div>

      <div className="w-full h-8 absolute bottom-[30%] left-0 rotate-[8deg]">
        <img src="assets/crime-scene.png" alt="l" className="w-full h-full" />
      </div>
      <div className="w-full h-8 absolute bottom-[30%] left-0 -rotate-[8deg]">
        <img src="assets/crime-scene.png" alt="l" className="w-full h-full" />
      </div>
    </div>
  );
}
