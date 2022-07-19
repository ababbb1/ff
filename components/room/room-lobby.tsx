import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { splitByColon } from '../../libs/client/utils';
import ModalLayout from '../modal-layout';
import RoomForm, { RoomFormData } from './room-form';
import { UserSession } from '../../libs/types/user';
import UserVideo from '../user-video';
import useToggle from '../../libs/hooks/useToggle';
import useInput from '../../libs/hooks/useInput';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import {
  exitRoom,
  gameReady,
  gameStart,
  submitMessage,
  updateRoom,
} from '../../libs/client/socket.io';
import { RoomData } from '../../libs/types/room';
import {
  mediaDeviceChange,
  MediaKindType,
  mediaOnOffToggle,
} from '../../libs/client/media';

interface Props {
  user: UserSession;
}

export default function RoomLobby({ user }: Props) {
  const [state, dispatch] = useRoomContext();
  const { roomInfo, currentUsers, stream, video, audio, messageList } = state;

  const router = useRouter();
  const isMaster = user?.nickname === roomInfo?.master;
  const isReady = currentUsers?.every(v => v.readyState);

  const [isSetting, toggleIsSetting] = useToggle();

  const {
    value: message,
    onChange: onMessageChange,
    clear: messageClear,
  } = useInput();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const currentUsersVideoRefs = useRef<HTMLVideoElement[]>([]);

  const handleExitButton = () => {
    exitRoom({ roomId: roomInfo?.id, userId: user.id });
    router.back();
  };

  const handleStartButton = () => {
    gameStart({
      roomId: roomInfo?.id,
      userId: user.id,
    });
  };

  const handleReadyButton = () => {
    gameReady({
      roomId: roomInfo?.id,
      userId: user.id,
    });
  };

  const handleSubmitMessage = () => {
    if (message) {
      submitMessage({
        message,
        nickname: user.nickname,
        roomId: roomInfo?.id,
      });

      messageClear();
    }
  };

  const handleMediaToggleButton = (type: 'VIDEO_INPUT' | 'AUDIO_INPUT') => {
    mediaOnOffToggle(state, dispatch, type);
  };

  const onMediaDeviceChange =
    (type: MediaKindType) => (e: ChangeEvent<HTMLSelectElement>) => {
      const deviceId = e.target.value;
      if (stream) mediaDeviceChange(stream, dispatch, type, deviceId);
    };

  const onSettingFormValid = async (data: RoomFormData) => {
    updateRoom({ ...data, roomId: roomInfo?.id });
    toggleIsSetting(false);
  };

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (roomInfo?.roomState === 'hintReady') {
      router.replace(`/room/${roomInfo.id}/hint`);
    }
  }, [roomInfo]);

  return (
    <>
      <div>
        <div className="flex gap-4">
          {isMaster ? (
            <>
              <button onClick={() => toggleIsSetting(true)}>세팅</button>
              {currentUsers.length > 1 && isReady ? (
                <button className="text-red-500" onClick={handleStartButton}>
                  게임시작
                </button>
              ) : (
                <button>게임시작</button>
              )}
            </>
          ) : (
            <button onClick={handleReadyButton}>준비</button>
          )}

          <button onClick={handleExitButton}>나가기</button>
        </div>

        <div className="flex flex-col border border-black">
          <span>{`title: ${roomInfo?.title}`}</span>
          <span>{`episode: ${roomInfo?.episode}`}</span>
          <span>{`힌트 시간: ${roomInfo?.hintTime}`}</span>
          <span>{`추리 시간: ${roomInfo?.reasoningTime}`}</span>
        </div>

        <div className="border border-black">
          <span>채팅</span>
          <ul>
            {messageList.map((v, i) => (
              <li key={`message${i}`}>
                <p>{v}</p>
              </li>
            ))}
          </ul>

          <div>
            <input
              value={message}
              onChange={onMessageChange}
              placeholder="메시지 입력"
              onKeyUp={e => {
                if (e.key === 'Enter') handleSubmitMessage();
              }}
            />
            <button onClick={handleSubmitMessage}>전송</button>
          </div>
        </div>

        <div>
          <div className="border border-red-500">
            <span>{splitByColon(user.nickname, 'name')}</span>
            {isMaster && <span>방장</span>}
            <div>
              <div>
                <UserVideo width={100} height={100} ref={myVideoRef} />
              </div>
              <div>
                {video.input.state ? (
                  <button
                    onClick={() => handleMediaToggleButton('VIDEO_INPUT')}
                  >
                    비디오 끄기
                  </button>
                ) : (
                  <button
                    onClick={() => handleMediaToggleButton('VIDEO_INPUT')}
                  >
                    비디오 켜기
                  </button>
                )}
                {audio.input.state ? (
                  <button
                    onClick={() => handleMediaToggleButton('AUDIO_INPUT')}
                  >
                    마이크 끄기
                  </button>
                ) : (
                  <button
                    onClick={() => handleMediaToggleButton('AUDIO_INPUT')}
                  >
                    마이크 켜기
                  </button>
                )}
              </div>
              <div>
                <select onChange={onMediaDeviceChange('VIDEO_INPUT')}>
                  {video.input.devices.map(v => (
                    <option key={v.deviceId} value={v.deviceId}>
                      {v.label}
                    </option>
                  ))}
                </select>
                <select onChange={onMediaDeviceChange('AUDIO_INPUT')}>
                  {audio.input.devices.map(v => (
                    <option key={v.deviceId} value={v.deviceId}>
                      {v.label}
                    </option>
                  ))}
                </select>
                <select onChange={onMediaDeviceChange('AUDIO_OUTPUT')}>
                  {audio.output.devices.map(v => (
                    <option key={v.deviceId} value={v.deviceId}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {currentUsers &&
            currentUsers
              .filter(v => v.id !== user.id)
              .map((v, i) => (
                <div key={`user${i}`} className="border border-black">
                  <span>{splitByColon(v.nickname, 'name')}</span>
                  {v.nickname === roomInfo?.master && <span>방장</span>}
                  <div className="w-[100px] h-[100px] flex justify-center items-center bg-black"></div>
                </div>
              ))}
        </div>
      </div>

      {isSetting && (
        <ModalLayout
          background="dark"
          handleClose={() => {
            toggleIsSetting(false);
          }}
        >
          <div className="w-[80%] h-[80%]">
            <RoomForm
              initData={roomInfo as RoomData}
              master={user.nickname}
              onValid={onSettingFormValid}
            />
          </div>
        </ModalLayout>
      )}
    </>
  );
}
