import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RoomFormData } from '../../../components/room/room-form';
import { gameReady, gameStart, updateRoom } from '../../socket.io';
import { RoomState } from '../../types/room';

export default function useRoomLobby(
  user: Session | null,
  { roomInfo, currentUsers }: RoomState,
) {
  const router = useRouter();
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
  };
}
