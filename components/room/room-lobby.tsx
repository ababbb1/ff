import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getMedia, toggleMediaState } from '../../libs/client/media';
import {
  currentUsersState,
  messageListState,
  roomInfoState,
  streamState,
  videoState,
} from '../../libs/client/room';
import { splitByColon } from '../../libs/client/utils';
import LoadingScreen from '../loading-screen';
import ModalLayout from '../modal-layout';
import RoomForm, { RoomFormData } from './room-form';
import { useRecoilState } from 'recoil';
import { UserSession } from '../../libs/types/user';
import { socket } from './socket';
import UserVideo from '../user-video';

export default function RoomLobby({ user }: { user: UserSession }) {
  const [roomInfo] = useRecoilState(roomInfoState);
  const [currentUsers] = useRecoilState(currentUsersState);
  const [stream, setStream] = useRecoilState(streamState);
  const [video, setVideo] = useRecoilState(videoState);
  const [messageList] = useRecoilState(messageListState);
  const dataToSendToServer = { roomId: roomInfo?.id, userId: user.id };

  const router = useRouter();
  const isMaster = user?.nickname === roomInfo?.master;
  const isReady = currentUsers?.filter(v => !v.readyState).length === 0;

  const [isSetting, setIsSetting] = useState(false);
  const [message, setMessage] = useState('');

  const myVideoRef = useRef<HTMLVideoElement>(null);

  const handleExitButton = () => {
    socket.emit('exit_room', dataToSendToServer);
    router.back();
  };

  const handleSubmitMessage = () => {
    if (message) {
      socket.emit('submit_chat', {
        message,
        nickname: user.nickname,
        roomId: roomInfo?.id,
      });

      setMessage('');
    }
  };

  const handleVideoToggleButton = () => {
    if (stream) {
      toggleMediaState(stream, 'video');
      setVideo({ ...video, state: !video.state });
    }
  };

  const onSettingFormValid = async (data: RoomFormData) => {
    socket.emit('update_room', { ...data, roomId: roomInfo?.id });
    setIsSetting(false);
  };

  useEffect(() => {
    if (myVideoRef.current) myVideoRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    if (roomInfo?.roomState === 'hintReady')
      router.replace(`/room/${roomInfo.id}/hint`);
  }, [router, roomInfo]);

  if (!roomInfo) return <LoadingScreen />;
  return (
    <>
      <div>
        <div className="flex gap-4">
          {isMaster ? (
            <>
              <button onClick={() => setIsSetting(true)}>세팅</button>
              {currentUsers.length > 1 && isReady ? (
                <button
                  className="text-red-500"
                  onClick={() => socket.emit('game_start', dataToSendToServer)}
                >
                  게임시작
                </button>
              ) : (
                <button>게임시작</button>
              )}
            </>
          ) : (
            <button
              onClick={() => socket.emit('ready_state', dataToSendToServer)}
            >
              준비
            </button>
          )}

          <button onClick={handleExitButton}>나가기</button>
        </div>

        <div className="flex flex-col border border-black">
          <span>{`title: ${roomInfo.title}`}</span>
          <span>{`episode: ${roomInfo.episode}`}</span>
          <span>{`힌트 시간: ${roomInfo.hintTime}`}</span>
          <span>{`추리 시간: ${roomInfo.reasoningTime}`}</span>
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
              onChange={e => {
                setMessage(e.target.value);
              }}
              type="text"
              placeholder="메시지 입력"
              value={message}
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
              <UserVideo width={100} height={100} ref={myVideoRef} />
              {video.state ? (
                <button onClick={handleVideoToggleButton}>비디오 끄기</button>
              ) : (
                <button onClick={handleVideoToggleButton}>비디오 켜기</button>
              )}
            </div>
          </div>
          {currentUsers &&
            currentUsers
              .filter(v => v.id !== user.id)
              .map((v, i) => (
                <div key={`user${i}`} className="border border-black">
                  <span>{splitByColon(v.nickname, 'name')}</span>
                  {v.nickname === roomInfo.master && <span>방장</span>}
                  <div className="w-[100px] h-[100px] flex justify-center items-center bg-black"></div>
                </div>
              ))}
        </div>
      </div>

      {isSetting && (
        <ModalLayout
          background="dark"
          handleClose={() => {
            setIsSetting(false);
          }}
        >
          <div className="w-[80%] h-[80%]">
            <RoomForm
              initData={roomInfo}
              master={user.nickname}
              onValid={onSettingFormValid}
            />
          </div>
        </ModalLayout>
      )}
    </>
  );
}
