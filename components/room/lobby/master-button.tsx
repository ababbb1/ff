import Cog from '../../svg/lobby/cog';

interface Props {
  isAllReady: boolean;
  handleStartButton: () => void;
  handleSettingButton: () => void;
}

export default function MasterButton({
  isAllReady,
  handleStartButton,
  handleSettingButton,
}: Props) {
  return (
    <div className="flex w-full h-full">
      <div
        onClick={
          isAllReady
            ? handleStartButton
            : () => {
                return;
              }
        }
        className={`w-full h-full pt-2 flex justify-center items-center ${
          isAllReady
            ? 'bg-[#17EF46] hover:cursor-pointer hover:bg-black hover:text-[#17EF46] text-3xl 2xl:text-4xl'
            : 'bg-white text-2xl 2xl:text-3xl'
        } border-r-2 border-black font-hanson-bold`}
      >
        {isAllReady ? 'START' : 'WAITING...'}
      </div>
      <div
        onClick={handleSettingButton}
        className="aspect-square h-full hover:cursor-pointer hover:bg-black hover:text-white"
      >
        <div className="w-full h-full flex justify-center items-center hover:rotate-90 duration-500">
          <Cog className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
