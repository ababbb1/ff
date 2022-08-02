import FlowerImage from '../../../svg/hint/flower';
import { SectionComponentProps } from '../room-hint';

export default function Library({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="w-full h-full">
      <div
        onClick={() =>
          setCurrentSection({ name: 'library', component: Library })
        }
        className="relative flex w-full h-full px-1 py-3 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="w-fit absolute -right-2 -top-2 translate-x-[100%]">
          <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#4285f4]"></div>
          <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
            1F 장세민 서재
          </span>
        </div>

        <div className="flex flex-col w-1/2 h-full justify-end">
          <div className="w-full h-[45%] px-[20%] flex flex-col gap-1">
            <div className="w-full h-1/2 flex justify-center items-center">
              <div className="h-full aspect-square rounded-md bg-[#efefef]"></div>
            </div>
            <div className="w-full h-1/2 flex justify-center items-center border border-black bg-[#efefef] rounded-md">
              <span className="font-semibold text-[0.5rem] 2xl:text-xs whitespace-nowrap">
                쇼파
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 h-full justify-end gap-6">
          <div className="w-8 h-[60%] bg-[#efefef] border border-black rounded-md flex justify-center items-center">
            <span className="font-semibold text-[0.5rem] 2xl:text-xs block w-[1px] leading-3 -translate-x-[0.25rem] 2xl:-translate-x-[0.375rem]">
              작업책상
            </span>
          </div>
          <div className="w-8 h-full bg-[#efefef] border border-black rounded-md flex justify-center items-center">
            <span className="font-semibold text-[0.5rem] 2xl:text-xs whitespace-nowrap">
              책
            </span>
          </div>
        </div>

        <div className="absolute h-9 2xl:h-10 w-2 bg-black left-0 top-[50%] -translate-y-[50%] -translate-x-[90%] z-[5]"></div>
        <div className="absolute left-1 bottom-1">
          <FlowerImage className="w-7 h-7 2xl:w-8 2xl:h-8" />
        </div>
      </div>
    </div>
  );
}
