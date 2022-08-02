import { SectionComponentProps } from '../room-hint';

export default function JungRoom({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-fit">
        <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#4285f4]"></div>
        <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
          2F 정손녀 방
        </span>
      </div>
      <div
        onClick={() =>
          setCurrentSection({ name: 'jungroom', component: JungRoom })
        }
        className="relative flex w-40 h-24 2xl:w-48 2xl:h-32 px-1 py-1 2xl:py-3 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="w-1/3 flex flex-col gap-1 py-2">
          <div className="bg-[#efefef] rounded-md w-6 h-full border border-black flex justify-center items-center">
            <span className="font-semibold text-xs -rotate-90 whitespace-nowrap">
              가방
            </span>
          </div>
        </div>
        <div className="w-1/3 flex flex-col px-[1%]">
          <div className="w-full h-1/5 border border-black bg-[#efefef] rounded-sm 2xl:rounded-md flex justify-center items-center">
            <span className="font-semibold text-xs whitespace-nowrap">
              화장대
            </span>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <div className="w-12 h-[4.5rem] border border-black rounded-md flex bg-[#efefef] px-2 py-1">
            <div className="w-full rounded-full bg-[#d9d9d9] h-3 border border-black"></div>
          </div>
        </div>

        <div className="absolute w-9 2xl:w-10 h-2 bg-black left-[20%] bottom-0 translate-y-[50%]"></div>
      </div>
    </div>
  );
}
