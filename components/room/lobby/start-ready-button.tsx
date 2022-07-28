import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ROLES } from '../../../libs/const';
import usePopup from '../../../libs/hooks/room/usePopup';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import ModalLayout from '../../modal-layout';
import CogIcon from '../../svg/lobby/cog';

interface Props {
  isMaster: boolean;
  handleSettingButton: () => void;
  handleStartButton: () => void;
  handleReadyButton: () => void;
}

export default function StartReadyButton({
  isMaster,
  handleSettingButton,
  handleStartButton,
  handleReadyButton,
}: Props) {
  const { data: userSession } = useSession();
  const [{ currentUsers, roomInfo }] = useRoomContext();

  const currentUsersExeptMaster = currentUsers.filter(
    cUser => cUser.nickname !== roomInfo?.master,
  );

  const amIReady = currentUsers.find(
    cUser => cUser.userId === userSession?.userId,
  )?.readyState;

  const isAllReady =
    currentUsersExeptMaster.length > 0 &&
    currentUsersExeptMaster.every(cUser => cUser.readyState);

  const [isModalActive, setIsModalActive] = useState(false);

  const {
    popupButtonRef,
    popupRef,
    isActive,
    setIsActive,
    handleClickPopupButton,
  } = usePopup();

  const handleClickCogIconButton = () => {
    setIsActive(false);
    setIsModalActive(true);
  };

  const handleModalClose = () => {
    setIsModalActive(false);
  };

  return (
    <>
      <div className="flex w-full h-full">
        <div
          onClick={
            isMaster
              ? isAllReady
                ? handleStartButton
                : () => {
                    return;
                  }
              : handleReadyButton
          }
          className={`w-full h-full pt-2 flex justify-center items-center ${
            isMaster
              ? isAllReady
                ? 'bg-[#17EF46] hover:cursor-pointer hover:bg-black hover:text-[#17EF46] text-3xl 2xl:text-4xl'
                : 'text-2xl 2xl:text-3xl'
              : amIReady
              ? 'bg-[#17EF46] hover:cursor-pointer text-3xl 2xl:text-4xl'
              : 'bg-black text-[#17EF46] hover:bg-[#17EF46] hover:text-black hover:cursor-pointer hover:black text-3xl 2xl:text-4xl'
          } border-r-2 border-black font-hanson-bold`}
        >
          {isMaster ? (isAllReady ? 'START' : 'WAITING...') : 'READY'}
        </div>
        <div className="aspect-square h-full hover:cursor-pointer hover:bg-black hover:text-white relative">
          <div
            ref={isMaster ? popupButtonRef : null}
            onClick={
              isMaster ? handleClickPopupButton : handleClickCogIconButton
            }
            className="w-full h-full flex justify-center items-center hover:rotate-90 duration-500"
          >
            <CogIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
          </div>
          <div
            ref={popupRef}
            className={`absolute bottom-[100%] right-0 w-full bg-black transition-all duration-300 flex flex-col justify-center items-center ${
              isActive ? 'opacity-100 z-20' : 'opacity-0 -z-10'
            }`}
          >
            <button
              onClick={handleClickCogIconButton}
              className="whitespace-nowrap w-full h-1/2 hover:bg-white hover:text-black p-3"
            >
              역할 선택
            </button>
            <button
              onClick={handleSettingButton}
              className="whitespace-nowrap w-full h-1/2 hover:bg-white hover:text-black p-3"
            >
              게임 설정
            </button>
          </div>
        </div>
      </div>
      <ModalLayout
        isActive={isModalActive}
        handleClose={handleModalClose}
        background="dark"
      >
        <div className="w-[50vw] h-[25vw] bg-white flex justify-center items-center">
          {ROLES.map(role => (
            <input key={role} type="radio" name="role" value={role} />
          ))}
        </div>
      </ModalLayout>
    </>
  );
}
