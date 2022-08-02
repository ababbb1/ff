import { SectionComponentProps } from '../room-hint';
import BathRoom from './bathroom';
import HongRoom from './hong-room';
import JangRoom from './jang-room';
import JungRoom from './jung-room';
import Library from './library';
import LivingRoom from './living-room';
import ParkRoom from './park-room';
import SonRoom from './son-room';
import YangRoom from './yang-room';

export default function HintMap({ setCurrentSection }: SectionComponentProps) {
  return (
    <div className="w-full h-full bg-[#0000009a] flex py-6 2xl:py-8 gap-1">
      <div className="h-full w-[22%] flex flex-col justify-end py-16">
        <div className="w-full aspect-square flex justify-end pt-12">
          <ParkRoom {...{ setCurrentSection }} />
        </div>
      </div>
      <div className="h-full grow flex flex-col gap-2">
        <div className="w-full h-1/3 flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <YangRoom {...{ setCurrentSection }} />
            <SonRoom {...{ setCurrentSection }} />
            <JungRoom {...{ setCurrentSection }} />
          </div>
          <div className="relative w-full h-14 bg-[#d9d9d9] rounded-xl flex justify-center items-center border border-black">
            <div className="absolute z-[5] left-0 top-[50%] -translate-x-[50%] w-6 h-28 bg-[#3c3c3c] flex flex-col justify-center items-center">
              <span className="text-white font-semibold 2xl:text-sm text-xs">
                2
              </span>
              <span className="text-white font-semibold 2xl:text-sm text-xs">
                층
              </span>
              <span className="text-white font-semibold 2xl:text-sm text-xs">
                계
              </span>
              <span className="text-white font-semibold 2xl:text-sm text-xs">
                단
              </span>
            </div>
            <span>
              복&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도
            </span>
          </div>
        </div>
        <div className="w-full h-full flex gap-1 pt-4">
          <div className="h-full w-1/2 flex flex-col">
            <LivingRoom {...{ setCurrentSection }} />
          </div>
          <div className="h-full w-1/2 flex flex-col gap-1">
            <div className="w-full h-[58%] flex gap-1">
              <div className="h-full w-1/2">
                <JangRoom {...{ setCurrentSection }} />
              </div>
              <div className="h-full w-1/2">
                <BathRoom {...{ setCurrentSection }} />
              </div>
            </div>
            <div className="w-full grow">
              <Library {...{ setCurrentSection }} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-[25%] flex justify-center items-center">
        <HongRoom {...{ setCurrentSection }} />
      </div>
    </div>
  );
}
