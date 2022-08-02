import { SectionComponentProps } from '../room-hint';

export default function HongRoom({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="pb-24 2xl:pb-36 flex flex-col gap-1">
      <div className="w-fit">
        <div className="w-full h-[0.3rem] -mb-1 2xl:mb-0 2xl:h-2 bg-[#4285f4]"></div>
        <span className="font-semibold text-white text-[0.5rem] 2xl:text-xs px-2">
          별채 홍변호 방
        </span>
      </div>
      <div
        onClick={() => {
          if (setCurrentSection) {
            setCurrentSection({ name: 'hongroom', component: HongRoom });
          }
        }}
        className="relative flex flex-col w-40 h-44 2xl:w-48 2xl:h-52 p-3 bg-[#d9d9d9] rounded-xl border border-black hover:bg-animate-layout-border hover:cursor-pointer"
      >
        <div className="w-full h-[30%] flex justify-end">
          <div className="w-1/2 rounded-xl bg-[#efefef] border border-black flex justify-end px-1 py-2">
            <div className="w-3 2xl:w-4 h-full rounded-full border border-black bg-[#d9d9d9]"></div>
          </div>
        </div>
        <div className="w-full h-[70%] flex justify-between py-2 px-1">
          <div className="w-7 h-full bg-[#efefef] rounded-md flex justify-center items-center border border-black">
            <span className="font-semibold text-sm">책</span>
          </div>
          <div className="pt-5">
            <div className="w-7 h-full bg-[#efefef] rounded-md flex justify-center items-center border border-black">
              <span className="font-semibold text-sm rotate-90 whitespace-nowrap">
                컴퓨터
              </span>
            </div>
          </div>
        </div>

        <div className="absolute w-9 2xl:w-10 h-2 bg-black left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%]"></div>
      </div>
    </div>
  );
}
