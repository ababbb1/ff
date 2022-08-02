import { SectionComponentProps } from '../room-hint';

export default function ParkRoom({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-fit">
        <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#4285f4]"></div>
        <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
          1F 박케어 방
        </span>
      </div>
      <div
        onClick={() => {
          if (setCurrentSection) {
            setCurrentSection({ name: 'parkroom', component: ParkRoom });
          }
        }}
        className="relative flex w-48 h-28 2xl:w-52 2xl:h-32 px-1 py-2 2xl:py-3 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="w-1/3 flex flex-col gap-1">
          <div className="bg-[#efefef] rounded-md w-6 h-10 2xl:w-7 2xl:h-11 border border-black flex justify-center items-center">
            <span className="font-semibold text-xs -rotate-90 whitespace-nowrap">
              옷장
            </span>
          </div>
          <div className="bg-[#efefef] rounded-md w-6 h-3 2xl:w-7 2xl:h-4 border border-black flex justify-center items-center"></div>
          <div></div>
        </div>
        <div className="w-1/3">
          <div className="w-12 h-[4.5rem] bg-[#efefef] border border-black rounded-md py-1 px-2">
            <div className="w-full h-3 rounded-full bg-[#d9d9d9] border border-black"></div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="w-full h-7 border border-black rounded-md flex bg-[#efefef] justify-center items-center">
            <span className="font-semibold text-xs whitespace-nowrap">
              책상
            </span>
          </div>
        </div>

        <div className="absolute h-9 2xl:h-10 w-2 bg-black top-[50%] right-0 -translate-y-[50%] translate-x-[90%] z-[5]"></div>
      </div>
    </div>
  );
}
