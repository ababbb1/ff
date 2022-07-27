import React, { useState } from 'react';
import RoomForm from '../../room-form/room-form';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { RoomData } from '../../../libs/types/room';
import useRoomLobby from '../../../libs/hooks/room/useRoomLobby';
import MessageInterface from '../message_interface';
import { useSession } from 'next-auth/react';
import EpisodeSelecter from '../../room-form/episode-selecter';
import StartReadyButton from './start-ready-button';
import UserCard from '../user-card/user-card';

export default function RoomLobby() {
  const { data: userSession } = useSession();
  const [roomState] = useRoomContext();
  const { roomInfo, currentUsers, peers } = roomState;
  const [currentEpisode, setCurrentEpisode] = useState(roomInfo?.episode);

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
                .filter(cUser => cUser.userId !== userSession?.userId)
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
                <UserCard {...{ user: userSession }} />
              </div>
            </div>

            <div className="w-1/2 flex flex-col border-l-2 border-black">
              <div className="w-full h-[86.6%]">
                <MessageInterface />
              </div>

              <div
                className={`w-full h-[13.4%] border-black border-t-2  disable-dragging`}
              >
                <StartReadyButton
                  {...{
                    isMaster,
                    handleStartButton,
                    handleReadyButton,
                    handleSettingButton,
                  }}
                />
              </div>
            </div>
          </div>

          {roomInfo && userSession && (
            <RoomForm
              {...{
                onValid: onSettingFormValid,
                onClose: handleSettingClose,
                initData: roomInfo as RoomData,
                master: userSession.nickname,
                currentEpisode,
                isActive: isSetting,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
