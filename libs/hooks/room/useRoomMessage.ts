import { useSession } from 'next-auth/react';
import { KeyboardEventHandler } from 'react';
import { submitMessage } from '../../socket.io';
import useInput from '../useInput';
import useRoomContext from './useRoomContext';

export default function useRoomMessage() {
  const { data: userSession } = useSession();
  const [{ roomInfo }] = useRoomContext();

  const {
    value: message,
    onChange: onMessageChange,
    clear: messageClear,
  } = useInput();

  const handleSubmitMessage = () => {
    if (message) {
      submitMessage({
        message,
        userId: userSession?.userId,
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
