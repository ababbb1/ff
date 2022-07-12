import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { splitByColon } from '../../libs/client/utils';
import { CurrentUser, RoomData, UserSession } from '../../libs/types/user';
import LoadingScreen from '../loading-screen';
import ModalLayout from '../modal-layout';
import RoomForm, { RoomFormData } from './room-form';

interface Props {
  user: UserSession;
  roomInfo?: RoomData;
  socket: Socket;
  currentUsers?: CurrentUser[];
}

export default function RoomLobby({
  user,
  roomInfo,
  socket,
  currentUsers,
}: Props) {
  const router = useRouter();
  const isMaster = user.nickname === roomInfo?.master;

  const [isSetting, setIsSetting] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleExitButton = () => {
    socket.emit('exit_room', { roomId: roomInfo?.id, userId: user.id });
    router.back();
  };

  const handleSubmitMessage = () => {
    socket.emit('submit_chat', {
      message,
      nickname: user.nickname,
      roomId: roomInfo?.id,
    });

    setMessage('');
  };

  const handleReadyButton = () => {
    socket.emit('ready_state', { roomId: roomInfo?.id, userId: user.id });
  };

  const onReceiveMessage = ({ message }: { message: string }) => {
    setMessageList(prev => [...prev, message]);
  };

  const onSettingFormValid = async (data: RoomFormData) => {
    socket.emit('update_room', { ...data, roomId: roomInfo?.id });
    setIsSetting(false);
  };

  useEffect(() => {
    socket.on('new_chat', onReceiveMessage);

    return () => {
      socket.off('new_chat', onReceiveMessage);
    };
  }, []);

  if (!roomInfo) return <LoadingScreen />;
  return (
    <>
      <div>
        {isMaster ? (
          <div>
            <button onClick={() => setIsSetting(true)}>세팅</button>
            <button>게임시작</button>
          </div>
        ) : (
          <button onClick={handleReadyButton}>준비</button>
        )}

        <button onClick={handleExitButton}>나가기</button>

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
            />
            <button onClick={handleSubmitMessage}>전송</button>
          </div>
        </div>

        <div>
          <span>유저</span>
          <div>
            {currentUsers?.map((v, i) => (
              <div key={`user${i}`}>{splitByColon(v.nickname, 'name')}</div>
            ))}
          </div>
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
