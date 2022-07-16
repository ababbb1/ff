import io from 'socket.io-client';
import { ImageInfo, UpdateRoomResponse } from '../../libs/types/room';
import { API_DOMAIN } from '../../libs/client/api';
import { useRecoilState } from 'recoil';
import {
  boardImageListState,
  currentUsersState,
  messageListState,
  myPeerConnectionState,
  roomInfoState,
  streamState,
  videoState,
} from '../../libs/client/room';
import { useEffect } from 'react';
import { UserSession } from '../../libs/types/user';
import { getMedia } from '../../libs/client/media';

interface Props {
  children: JSX.Element;
  user: UserSession;
  roomUniqueId?: string | string[];
  roomId?: string | string[];
}

export const socket = io(API_DOMAIN, {
  transports: ['websocket'],
  closeOnBeforeunload: false,
});

export default function SocketComponent({
  children,
  user,
  roomUniqueId,
  roomId,
}: Props) {
  const [currentUsers, setCurrentUsers] = useRecoilState(currentUsersState);
  const _roomInfoState = useRecoilState(roomInfoState);
  const _messageList = useRecoilState(messageListState);
  const [stream, setStream] = useRecoilState(streamState);
  const [video, setVideo] = useRecoilState(videoState);
  const [myPeerConnection, setMyPeerConnection] = useRecoilState(
    myPeerConnectionState,
  );
  const _boardImageListState = useRecoilState(boardImageListState);

  const setRoomInfo = _roomInfoState[1];
  const setMessageList = _messageList[1];
  const setBoardImageList = _boardImageListState[1];

  const makeRTCConnection = (stream: MediaStream) => {
    console.log('makeRTCConnection');
    const conn = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });
    conn.onicecandidate = handleIce;
    conn.ontrack = handleTrack;
    stream?.getTracks().forEach(track => conn.addTrack(track, stream));
    setMyPeerConnection(conn);
    setStream(stream);
  };

  const handleIce: (
    this: RTCPeerConnection,
    ev: RTCPeerConnectionIceEvent,
  ) => any = data => {
    socket.emit('ice', { ice: data.candidate, roomId });
  };

  const handleTrack = (data: any) => {
    console.log('streams', data.streams);
  };

  const initCall = () =>
    getMedia()
      .then(({ stream, cameras }) => {
        makeRTCConnection(stream);
        setVideo({ devices: cameras, state: true });
      })
      .catch(console.log);

  useEffect(() => {
    if (roomUniqueId) {
      socket.emit('create_room', { roomId, roomUniqueId });
    } else {
      socket.emit('join_room', {
        roomId,
        userId: user.id,
        email: user.email,
        nickname: user.nickname,
      });
    }

    socket.on(
      'update_room',
      ({ roomInfo, currentUser }: UpdateRoomResponse) => {
        const onlyMasterIsReady = currentUser?.map(v =>
          v.nickname === roomInfo.master ? { ...v, readyState: true } : v,
        );

        setCurrentUsers(onlyMasterIsReady);
        setRoomInfo(roomInfo);
        setBoardImageList(prev => [...prev]);
      },
    );

    socket.on('new_chat', ({ message }: { message: string }) => {
      setMessageList(prev => [...prev, message]);
    });

    socket.on('board_image', (imageInfo: ImageInfo) => {
      setBoardImageList(prev => [...prev, imageInfo]);
    });

    socket.on('ice', ice => {
      myPeerConnection?.addIceCandidate(ice);
    });

    initCall();
  }, []);

  useEffect(() => {
    if (myPeerConnection && stream) {
      socket.on('user_connected', async () => {
        console.log('user connected');
        const offer = await myPeerConnection.createOffer();
        myPeerConnection?.setLocalDescription(offer);
        socket.emit('offer', { offer, roomId });
      });

      socket.on('offer', async offer => {
        console.log('offer');
        await initCall();
        myPeerConnection.setRemoteDescription(offer);
        const answer = await myPeerConnection?.createAnswer();
        myPeerConnection.setLocalDescription(answer);
        socket.emit('answer', { answer, roomId });
      });

      socket.on('answer', answer => {
        console.log('answer');
        myPeerConnection?.setRemoteDescription(answer);
      });
    }
  }, [myPeerConnection, stream]);

  return children;
}
