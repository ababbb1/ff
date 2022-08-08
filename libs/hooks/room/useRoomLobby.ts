import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RoomFormData } from '../../../components/room-form/room-form';
import { getMedia } from '../../peer';
import {
  afterUpdateStream,
  gameReady,
  gameStart,
  streamEmit,
  updateRoom,
} from '../../socket.io';
import useRoomContext from './useRoomContext';

export default function useRoomLobby() {
  const router = useRouter();
  const { data: userSession } = useSession();
  const [{ roomInfo, peers }, dispatch] = useRoomContext();

  const [isSetting, setIsSetting] = useState(false);

  // const isAllReady = currentUsers.every(currentUser => currentUser.readyState);
  const isMaster = roomInfo?.master === userSession?.nickname;

  const handleStartButton = () => {
    // if (!isAllReady || currentUsers.length < ROOM_USER_COUNT_LIMIT) {
    //   alert('모두 준비 완료 상태여야 시작할 수 있습니다.');
    //   return;
    // }
    gameStart({
      roomId: roomInfo?.id,
      userId: userSession?.userId,
    });
  };

  const handleReadyButton = () => {
    gameReady({
      roomId: roomInfo?.id,
      userId: userSession?.userId,
    });
  };

  const handleSettingButton = () => setIsSetting(true);
  const handleSettingClose = () => setIsSetting(false);

  const onSettingFormValid = async (data: RoomFormData) => {
    updateRoom({ ...data, roomId: roomInfo?.id });
    setIsSetting(false);
  };

  const handleGetUserStream = () => {
    if (userSession) {
      getMedia().then(stream => {
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        dispatch({
          type: 'MY_STREAM_INFO',
          payload: {
            stream,
            videoDeviceId: videoTrack.id,
            audioDeviceId: audioTrack.id,
            videoTrackconstraints: videoTrack.getConstraints(),
            audioTrackconstraints: audioTrack.getConstraints(),
          },
        });
        streamEmit({
          roomId: roomInfo?.id,
          userId: userSession?.userId,
          streamId: stream.id,
        });
        afterUpdateStream(`${userSession.userId}`, stream, peers, dispatch);
      });
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
    handleGetUserStream,
  };
}
