import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RoomFormData } from '../../../components/room/room-form';
import { initWebRTCConnect } from '../../media';
import { gameReady, gameStart, updateRoom } from '../../socket.io';
import useRoomContext from './useRoomContext';

export default function useRoomLobby() {
  const router = useRouter();
  const { data: user } = useSession();
  const [{ roomInfo, currentUsers }, dispatch] = useRoomContext();

  const [isSetting, setIsSetting] = useState(false);

  const isReady = currentUsers.every(currentUser => currentUser.readyState);
  const isMaster = roomInfo?.master === user?.nickname;

  const handleStartButton = () => {
    if (!isReady || currentUsers.length < 2) {
      alert('모두 준비 완료 상태여야 시작할 수 있습니다.');
      return;
    }
    gameStart({
      roomId: roomInfo?.id,
      userId: user?.id,
    });
  };

  const handleReadyButton = () => {
    gameReady({
      roomId: roomInfo?.id,
      userId: user?.id,
    });
  };

  const handleSettingButton = () => setIsSetting(true);
  const handleSettingClose = () => setIsSetting(false);

  const onSettingFormValid = async (data: RoomFormData) => {
    updateRoom({ ...data, roomId: roomInfo?.id });
    setIsSetting(false);
  };

  const handleInitConnect = () => {
    if (roomInfo) {
      initWebRTCConnect(roomInfo.id, dispatch);
    }
  };

  useEffect(() => {
    if (roomInfo?.roomState === 'hintReady') {
      router.replace(`/room/${roomInfo.id}/hint`);
    }
  }, [roomInfo, router]);

  return {
    isMaster,
    handleStartButton,
    handleReadyButton,
    isSetting,
    handleSettingButton,
    handleSettingClose,
    onSettingFormValid,
    handleInitConnect,
  };
}
