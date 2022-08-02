import FlowerImage from '../../../svg/hint/flower';
import { SectionComponentProps } from '../room-hint';

export default function JangRoom({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <div className="w-fit">
        <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#4285f4]"></div>
        <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
          1F 장세민 침실
        </span>
      </div>
      <div
        onClick={() =>
          setCurrentSection({ name: 'jangroom', component: JangRoom })
        }
        className="relative flex flex-col w-full h-full py-1 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="w-full h-1/2 flex justify-center">
          <div className="w-16 h-20 border border-black rounded-md bg-[#efefef] px-3 py-1">
            <div className="w-full h-4 bg-[#d9d9d9] border border-black rounded-full"></div>
          </div>
        </div>

        <div className="absolute h-9 2xl:h-10 w-2 bg-black left-0 top-[45%] -translate-y-[50%] -translate-x-[90%] z-[5]"></div>
        <div className="absolute left-1 bottom-1">
          <FlowerImage className="w-7 h-7 2xl:w-8 2xl:h-8" />
        </div>
      </div>
    </div>
  );
}
