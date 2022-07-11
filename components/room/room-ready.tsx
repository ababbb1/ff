import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { RoomData, UserSession } from '../../libs/types/user';
import LoadingScreen from '../loading-screen';
import ModalLayout from '../modal-layout';
import RoomForm, { RoomFormData } from './room-form';

interface Props {
  user: UserSession;
  roomInfo?: RoomData;
  socket: Socket;
}

export default function RoomReady({ user, roomInfo, socket }: Props) {
  const router = useRouter();
  const isMaster = user.nickname === roomInfo?.master;

  const [isSetting, setIsSetting] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const exitButtonHandler = () => {
    socket.emit('exit_room', { roomId: roomInfo?.id, userId: user.id });
    socket.disconnect();
    router.replace('/');
  };

  const submitMessageHandler = () => {
    socket.emit('submit_chat', {
      message,
      nickname: user.nickname,
      roomId: roomInfo?.id,
    });

    setMessage('');
  };

  const onReceiveMessage = ({ message }: any) => {
    setMessageList(prev => [...prev, message]);
  };

  const onSettingFormValid = async (data: RoomFormData) => {
    console.log('update form data', data);
    socket.emit('update_room', { ...data, roomId: roomInfo?.id });
    setIsSetting(false);
  };

  useEffect(() => {
    socket.on('new_chat', onReceiveMessage);

    return () => {
      socket.off('new_chat', onReceiveMessage);
    };
  }, []);

  if (!roomInfo) return <LoadingScreen visible />;
  return (
    <>
      <div>
        {isMaster ? (
          <div>
            <button onClick={() => setIsSetting(true)}>세팅</button>
            <Link href={`/room/${roomInfo.id}/hint`} replace>
              게임시작
            </Link>
          </div>
        ) : (
          <button>준비</button>
        )}

        <button onClick={exitButtonHandler}>나가기</button>

        <div>
          <div>채팅</div>
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
            <button onClick={submitMessageHandler}>전송</button>
          </div>
        </div>
      </div>

      {isSetting && (
        <ModalLayout
          background="dark"
          onClose={() => {
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
