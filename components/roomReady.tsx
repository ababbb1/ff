import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  settingButtonHandler: () => void;
  roomId: string;
  messageList: string[];
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  submitMessage: () => void;
  isMaster: boolean;
}

export default function RoomReady({
  settingButtonHandler,
  roomId,
  messageList,
  message,
  setMessage,
  submitMessage,
  isMaster,
}: Props) {
  const router = useRouter();

  return (
    <div>
      {isMaster ? (
        <div>
          <button onClick={settingButtonHandler}>세팅</button>
          <button
            onClick={() => {
              router.replace(`/room/${roomId}/hint`);
            }}
          >
            게임시작
          </button>
        </div>
      ) : (
        <button>준비</button>
      )}

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
          <button onClick={submitMessage}>전송</button>
        </div>
      </div>
    </div>
  );
}
