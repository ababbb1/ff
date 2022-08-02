import { SectionComponentProps } from '../room-hint';

export default function LivingRoom({
  setCurrentSection,
}: SectionComponentProps) {
  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="w-fit ml-8">
        <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#4285f4]"></div>
        <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
          1F 대저택 거실
        </span>
      </div>
      <div
        onClick={() =>
          setCurrentSection({ name: 'livingroom', component: LivingRoom })
        }
        className="relative flex justify-center items-center w-full h-full px-1 py-3 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="absolute flex justify-center items-center bg-[#efefef] border border-black rounded-md w-1/2 h-6 left-[50%] -translate-x-[50%] top-2">
          <span className="font-semibold text-xs whitespace-nowrap">선반</span>
        </div>
        <div className="w-32 h-28 rounded-md bg-[#00000048] relative">
          <div className="absolute top-0 left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] h-9 rounded-md flex justify-center items-center bg-[#efefef] border border-black">
            <span className="font-semibold text-xs whitespace-nowrap">
              쇼파
            </span>
          </div>
          <div className="absolute left-0 top-[50%] -translate-y-[50%] -translate-x-[50%] h-[80%] w-9 rounded-md flex flex-col justify-center items-center py-2 gap-3 px-1">
            <div className="w-full aspect-square border border-black bg-[#efefef] rounded-md"></div>
            <div className="w-full aspect-square border border-black bg-[#efefef] rounded-md"></div>
          </div>
          <div className="absolute right-0 top-[50%] -translate-y-[50%] translate-x-[50%] h-[80%] w-9 rounded-md flex flex-col justify-center items-center py-2 gap-3 px-1">
            <div className="w-full aspect-square border border-black bg-[#efefef] rounded-md"></div>
            <div className="w-full aspect-square border border-black bg-[#efefef] rounded-md"></div>
          </div>
        </div>

        <div className="absolute w-16 2xl:w-20 h-2 bg-black left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%]"></div>
      </div>
    </div>
  );
}
