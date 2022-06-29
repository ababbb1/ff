import { useState } from 'react';
import FollowingCursor from '../components/followingCursor';

export default function Ani() {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
        className="border border-black"
      >
        cursor toggle button
      </button>
      <FollowingCursor visible={visible} />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-[500px] h-[300px] border-2 border-black flex justify-center items-center relative overflow-hidden">
          <div className="absolute flex w-[996px] top-0 left-[-498px] z-10 whitespace-nowrap animate-[text-move-right_6s_infinite_linear]">
            <div className="w-[498px] h-[23px] flex justify-around">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>example</span>
                ))}
            </div>
            <div className="w-[498px] h-[23px] flex justify-around">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>example</span>
                ))}
            </div>
          </div>
          <div className="absolute flex w-[596px] right-0 top-[-298px] z-10 whitespace-nowrap animate-[text-move-down_6s_infinite_linear]">
            <div className="w-[298px] h-[23px] flex justify-around">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>example</span>
                ))}
            </div>
            <div className="w-[498px] h-[23px] flex justify-around">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>example</span>
                ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 w-[23px] h-[23px] bg-white z-20"></div>
          <div className="absolute top-0 right-0 w-[23px] h-[23px] bg-white z-20"></div>
          <div className="absolute bottom-0 right-0 w-[23px] h-[23px] bg-white z-20"></div>
          <div className="absolute bottom-0 left-0 w-[23px] h-[23px] bg-white z-20"></div>
          <div className="w-[450px] h-[250px] border-2 border-black"></div>
        </div>
      </div>
    </>
  );
}
