import useRoomMessage from '../../libs/hooks/room/useRoomMessage';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { useSession } from 'next-auth/react';

export default function MessageInterface() {
  const { data: user } = useSession();
  const [{ messageList, roomInfo }] = useRoomContext();
  const { message, onMessageChange, handleSubmitMessage, handleKeyup } =
    useRoomMessage(user, roomInfo);

  return (
    <div className="w-full h-full flex flex-col">
      <ul className="h-full overflow-auto">
        {messageList.map((v, i) => (
          <li key={`message${i}`}>
            <p>{v}</p>
          </li>
        ))}
      </ul>
      <div className="flex w-full">
        <input
          value={message}
          onChange={onMessageChange}
          placeholder="메시지 입력"
          onKeyUp={handleKeyup}
          className="w-full border border-black focus:outline-black focus:outline-4"
        />
        <button
          onClick={handleSubmitMessage}
          className="w-16 h-full border border-black"
        >
          전송
        </button>
      </div>
    </div>
  );
}
