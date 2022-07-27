import { KeyboardEventHandler } from 'react';
import { submitMessage } from '../../socket.io';
import { RoomData } from '../../types/room';
import { UserSession } from '../../types/user';
import useInput from '../useInput';

export default function useRoomMessage(
  user: UserSession,
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
        userId: user?.userId,
        roomId: roomInfo?.id,
        at: new Date(),
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
