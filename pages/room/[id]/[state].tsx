import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import { UserSession } from '../../../libs/types/user';
import RoomLobby from '../../../components/room/room-lobby';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/loading-screen';
import Layout from '../../../components/layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  CurrentUser,
  ImageData,
  MediaState,
  RoomData,
  UpdateRoomResponse,
} from '../../../libs/types/room';
import { API_DOMAIN } from '../../../libs/client/api';
import { io } from 'socket.io-client';
import { getMedia } from '../../../libs/client/media';

const RoomHint = dynamic(() => import('../../../components/room/room-hint'), {
  ssr: false,
});
const RoomReasoning = dynamic(
  () => import('../../../components/room/reasoning/room-reasoning'),
  { ssr: false },
);

const Room = ({ user }: { user: UserSession }) => {
  const socket = io(API_DOMAIN, {
    transports: ['websocket'],
    closeOnBeforeunload: false,
  });

  // router
  const router = useRouter();
  const { id: roomId, state: roomState, roomUniqueId } = router.query;
  const dataToSendToServer = { roomId, userId: user.id };

  // state
  const [roomInfo, setRoomInfo] = useState<RoomData | null>(null);
  const [currentUsers, setCurrentUsers] = useState<CurrentUser[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageList, setImageList] = useState<ImageData[]>([]);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [myPeerConnection, setMyPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [videoState, setVideoState] = useState<MediaState>({
    devices: [],
    state: false,
  });

  //functions
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
        setVideoState({ devices: cameras, state: true });
      })
      .catch(console.log);

  const onBeforeUnload = () => {
    socket.emit('exit_room', dataToSendToServer);
    socket.removeAllListeners();
  };

  // useEffect
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
      },
    );

    socket.on('new_chat', ({ message }: { message: string }) => {
      setMessageList(prev => [...prev, message]);
    });

    socket.on('ice', ice => {
      myPeerConnection?.addIceCandidate(ice);
    });

    initCall();

    router.beforePopState(() => {
      onBeforeUnload();
      router.replace('/');
      return false;
    });

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
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

  useEffect(() => {
    console.log(roomInfo);
  }, [roomInfo]);
  useEffect(() => {
    console.log(currentUsers);
  }, [currentUsers]);

  return (
    <Layout>
      {roomState === 'hint' ? (
        <Suspense fallback={<LoadingScreen />}>
          <RoomHint
            {...{
              user,
              roomInfo,
              imageListState: [imageList, setImageList],
              socket,
              currentUsers,
            }}
          />
        </Suspense>
      ) : roomState === 'reasoning' ? (
        <Suspense fallback={<LoadingScreen />}>
          <DndProvider backend={HTML5Backend}>
            <RoomReasoning
              {...{
                imageListState: [imageList, setImageList],
                socket,
                roomInfo,
              }}
            />
          </DndProvider>
        </Suspense>
      ) : (
        <RoomLobby
          {...{
            user,
            roomInfo,
            currentUsers,
            socket,
            stream,
            video: [videoState, setVideoState],
            messageList,
          }}
        />
      )}
    </Layout>
  );
};

export default Room;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (!req.headers.referer) {
    return {
      redirect: {
        destination: '/error/access-denied',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session,
    },
  };
};
