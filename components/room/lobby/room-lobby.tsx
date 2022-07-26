import React, { useState } from 'react';
import RoomForm from '../../room-form/room-form';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { RoomData } from '../../../libs/types/room';
import UserCard from '../user-card/user-card';
import useRoomLobby from '../../../libs/hooks/room/useRoomLobby';
import CurrentUsers from './current-users';
import MessageInterface from '../message_interface';
import { useSession } from 'next-auth/react';
import CardButton from '../user-card/card-button';
import MyDeviceButton from '../user-card/my-device-button';
import EpisodeSelecter from '../../room-form/episode-selecter';
import MasterButton from './master-button';
import { UserSession } from '../../../libs/types/user';

export default function RoomLobby() {
  const { data: user } = useSession();
  const [roomState] = useRoomContext();
  const { roomInfo, currentUsers, myStream } = roomState;
  const [currentEpisode, setCurrentEpisode] = useState(roomInfo?.episode);

  const amIReady = currentUsers.find(
    currentUser => currentUser.id === user?.id,
  )?.readyState;

  const currentUsersExeptMaster = currentUsers.filter(
    cUser => cUser.nickname !== roomInfo?.master,
  );

  const isAllReady =
    currentUsersExeptMaster.length > 0 &&
    currentUsersExeptMaster.every(cUser => cUser.readyState);

  const {
    isMaster,
    handleStartButton,
    handleReadyButton,
    isSetting,
    handleSettingButton,
    handleSettingClose,
    onSettingFormValid,
    handleInitConnect,
  } = useRoomLobby();

  return (
    <>
      <div className="flex w-full h-full">
        {/* left */}
        <div className="w-1/2 h-full">
          <EpisodeSelecter
            {...{
              initEpisode: currentEpisode,
              onChange: setCurrentEpisode,
              isActive: isSetting,
            }}
          />
        </div>

        {/* right */}
        <div className="w-1/2 h-full relative">
          <div className="w-full h-full flex">
            <div className="w-1/2 flex flex-col">
              <div className="w-full h-4/5">
                <CurrentUsers />
              </div>
              <div className="w-full h-1/5 bg-white rounded-tr-2xl p-3">
                <UserCard
                  key={'usercard'}
                  {...{
                    isMe: true,
                    isMaster,
                    user: user as UserSession,
                    stream: myStream,
                    buttons: [
                      isMaster ? (
                        <CardButton
                          key={'setting'}
                          isButton
                          onClick={handleSettingButton}
                          text={'Setting'}
                        />
                      ) : amIReady ? (
                        <CardButton key={'ready'} text={'Ready'} />
                      ) : (
                        <div key={'none'}></div>
                      ),
                      myStream ? (
                        <div key={'deviceButton'} className="flex gap-1">
                          <MyDeviceButton key={'video'} type="VIDEO" />
                          <MyDeviceButton key={'audio'} type="AUDIO" />
                        </div>
                      ) : (
                        <CardButton
                          key={'initConnect'}
                          isButton
                          onClick={handleInitConnect}
                          text={'Video chat'}
                        />
                      ),
                    ],
                  }}
                />
              </div>
            </div>

            <div className="w-1/2 flex flex-col border-l-2 border-black">
              <div className="w-full h-[86.7%]">
                <MessageInterface />
              </div>

              <div
                className={`w-full h-[13.3%] border-black border-t-2  disable-dragging`}
              >
                {isMaster ? (
                  <MasterButton
                    {...{ isAllReady, handleStartButton, handleSettingButton }}
                  />
                ) : (
                  <div
                    onClick={handleReadyButton}
                    className={`w-full h-full flex justify-center items-center transition-colors duration-100 hover:cursor-pointer ${
                      amIReady
                        ? 'bg-black text-animate-layout-border'
                        : 'bg-animate-layout-border'
                    }`}
                  >
                    <span className="font-hanson-bold text-3xl 2xl:text-4xl pt-2">
                      READY
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <RoomForm
            {...{
              onValid: onSettingFormValid,
              onClose: handleSettingClose,
              initData: roomInfo as RoomData,
              master: user?.nickname as string,
              currentEpisode,
              isActive: isSetting,
            }}
          />
        </div>
      </div>
    </>
  );
}
