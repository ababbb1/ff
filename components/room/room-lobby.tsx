import React, { useEffect, useState } from 'react';
import RoomForm from './room-form';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { RoomData } from '../../libs/types/room';
import EpisodeSelecter from './episode-selecter';
import UserCard from './user-card/user-card';
import useRoomLobby from '../../libs/hooks/room/useRoomLobby';
import CurrentUsers from './lobby/current-users';
import MessageInterface from './message_interface';
import { mediaOnOffToggle } from '../../libs/media';
import MyDeviceButton from './user-card/my-device-button';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export default function RoomLobby() {
  const { data: user } = useSession();
  const [roomState, dispatch] = useRoomContext();
  const { roomInfo, currentUsers, currentUserStreams, myStream } = roomState;
  const [currentEpisode, setCurrentEpisode] = useState(roomInfo?.episode);
  const currentUsersExceptMe = currentUsers.filter(
    currentUser => currentUser.id !== user?.id,
  );

  const amIReady = currentUsers.find(
    currentUser => currentUser.id === user?.id,
  )?.readyState;

  const {
    isMaster,
    handleStartButton,
    handleReadyButton,
    isSetting,
    handleSettingButton,
    handleSettingClose,
    onSettingFormValid,
  } = useRoomLobby(user, roomState);

  useEffect(() => {
    mediaOnOffToggle(roomState, dispatch, 'VIDEO_INPUT');
    mediaOnOffToggle(roomState, dispatch, 'AUDIO_INPUT');
  }, []);

  return (
    <>
      <div className="flex gap-[2px] w-full h-full">
        {/* left */}
        <div className="w-1/2 h-full">
          <EpisodeSelecter
            {...{
              currentEpisode: roomInfo?.episode,
              onChange: setCurrentEpisode,
              isActive: isSetting,
            }}
          />
        </div>

        {/* right */}
        <div className="w-1/2 h-full relative">
          <div className="w-full h-full flex gap-[2px]">
            <div className="w-[49%] flex flex-col gap-[2px]">
              <div className="w-full h-4/5">
                <CurrentUsers
                  {...{ currentUsersExceptMe, isMaster, currentUserStreams }}
                />
              </div>
              <div className="w-full h-1/5 bg-white rounded-tr-2xl p-3">
                <UserCard
                  key={'usercard'}
                  {...{
                    isMe: true,
                    isMaster,
                    user: user as Session,
                    stream: myStream as MediaStream,
                    buttons: [
                      isMaster ? (
                        <button
                          onClick={handleSettingButton}
                          className="w-full h-full rounded bg-gray-200"
                        >
                          게임 설정
                        </button>
                      ) : amIReady ? (
                        <div className="w-full h-full rounded bg-gray-200 flex justify-center items-center">
                          Ready
                        </div>
                      ) : (
                        <div></div>
                      ),
                      <MyDeviceButton key={'video'} type="VIDEO" />,
                      <MyDeviceButton key={'audio'} type="AUDIO" />,
                    ],
                  }}
                />
              </div>
            </div>

            <div className="w-[51%] flex flex-col gap-[2px]">
              <div className="w-full h-4/5 bg-white rounded-bl-2xl p-3 flex flex-col">
                <MessageInterface />
              </div>

              <div
                onClick={isMaster ? handleStartButton : handleReadyButton}
                className="w-full h-1/5 bg-gray-300 rounded-tl-2xl flex justify-center items-center hover:cursor-pointer hover:text-white hover:bg-black hover:border-4 hover:border-white"
              >
                {isMaster ? (
                  <span className="font-hanson-bold text-3xl 2xl:text-4xl pt-2 disable-dragging">
                    GAME START
                  </span>
                ) : (
                  <span className="font-hanson-bold text-3xl 2xl:text-4xl pt-2 disable-dragging">
                    READY
                  </span>
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
