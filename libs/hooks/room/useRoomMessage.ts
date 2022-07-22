import { Session } from 'next-auth';
import { KeyboardEventHandler } from 'react';
import { submitMessage } from '../../socket.io';
import { RoomData } from '../../types/room';
import useInput from '../useInput';

export default function useRoomMessage(
  user: Session | null,
  roomInfo: RoomData | null,
) {
  const {
    value: message,
    onChange: onMessageChange,
    clear: messageClear,
  } = useInput();

  const handleSubmitMessage = () => {
    if (message) {
      submitMessage({
        message,
        nickname: user?.nickname,
        roomId: roomInfo?.id,
      });
      messageClear();
    }
  };
  const handleKeyup: KeyboardEventHandler = e => {
    if (e.key === 'Enter') {
      handleSubmitMessage();
    }
  };

  return {
    message,
    onMessageChange,
    messageClear,
    handleSubmitMessage,
    handleKeyup,
  };
}
