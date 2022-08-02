import CorpsePoint from '../../../svg/hint/corpse-point';
import { SectionComponentProps } from '../room-hint';

export default function BathRoom({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <div className="w-fit">
        <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#ed2929]"></div>
        <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
          욕실 (사건시작)
        </span>
      </div>
      <div
        onClick={() =>
          setCurrentSection({ name: 'bathroom', component: BathRoom })
        }
        className="relative flex flex-col gap-1 w-full h-full p-2 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="w-full h-[35%]">
          <div className="w-full h-full bg-[#efefef] rounded-xl flex flex-col pt-1 pb-2 px-3 2xl:px-5 gap-1">
            <div className="w-full h-[40%] px-2 flex justify-end">
              <div className="w-[45%] h-full rounded-md flex justify-center items-center bg-[#d9d9d9]">
                <span className="font-semibold text-[0.5rem] 2xl:text-xs whitespace-nowrap">
                  스피커
                </span>
              </div>
            </div>
            <div className="w-full h-[60%] rounded-md px-3 bg-[#888888]">
              <CorpsePoint className="h-full" />
            </div>
          </div>
        </div>
        <div className="w-full h-[35%] flex justify-end">
          <div className="w-6 2xl:w-8 h-[60%] bg-[#efefef] rounded-md"></div>
        </div>
        <div className="w-full grow flex gap-5 2xl:gap-7">
          <div className="w-[30%] bg-[#efefef] rounded-md h-full"></div>
          <div className="h-full grow flex gap-[2px]">
            <div className="w-1/2 h-full rounded-md bg-[#efefef]"></div>
            <div className="w-1/2 h-full rounded-md bg-[#efefef] flex justify-center items-center">
              <span className="font-semibold text-[0.5rem] 2xl:text-xs whitespace-nowrap">
                세면대
              </span>
            </div>
          </div>
        </div>

        <div className="absolute h-9 2xl:h-10 w-2 bg-black left-0 top-[45%] -translate-y-[50%] -translate-x-[90%] z-[5]"></div>
      </div>
    </div>
  );
}
