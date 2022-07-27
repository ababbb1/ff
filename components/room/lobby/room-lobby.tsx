import React, { useState } from 'react';
import RoomForm from '../../room-form/room-form';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { RoomData } from '../../../libs/types/room';
import useRoomLobby from '../../../libs/hooks/room/useRoomLobby';
import MessageInterface from '../message_interface';
import { useSession } from 'next-auth/react';
import EpisodeSelecter from '../../room-form/episode-selecter';
import MasterButton from './master-button';
import { UserSession } from '../../../libs/types/user';
import UserCard from '../user-card/user-card';

export default function RoomLobby() {
  const { data } = useSession();
  const user = data as UserSession;
  const [roomState] = useRoomContext();
  const { roomInfo, currentUsers, peers } = roomState;
  const [currentEpisode, setCurrentEpisode] = useState(roomInfo?.episode);

  const amIReady = currentUsers.find(
    currentUser => currentUser.userId === user?.userId,
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
            <div className="w-1/2 flex flex-col relative">
              {currentUsers
                .filter(cUser => cUser.userId !== user?.userId)
                .map(cUser => (
                  <div
                    key={cUser.userId}
                    className="w-full h-1/5 border-b-2 border-black last:border-b-0"
                  >
                    <UserCard
                      {...{
                        user: cUser,
                        userStream: peers.find(
                          peer => +peer.userId === cUser.userId,
                        )?.peer.streams[0],
                      }}
                    />
                  </div>
                ))}
              <div className="absolute bottom-0 w-full h-1/5 border-t-2 border-black">
                <UserCard {...{ user }} />
              </div>

              {/* <div className="w-full h-4/5"> */}
              {/* <CurrentUsers /> */}
              {/* </div> */}
              {/* <div className="w-full h-1/5">
                <UserCard /> */}
              {/* <UserCard
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
                /> */}
            </div>

            <div className="w-1/2 flex flex-col border-l-2 border-black">
              <div className="w-full h-[86.6%]">
                <MessageInterface />
              </div>

              <div
                className={`w-full h-[13.4%] border-black border-t-2  disable-dragging`}
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
              master: user.nickname,
              currentEpisode,
              isActive: isSetting,
            }}
          />
        </div>
      </div>
    </>
  );
}
