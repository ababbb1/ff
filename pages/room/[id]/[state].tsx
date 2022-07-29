import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useRef } from 'react';
import RoomLobby from '../../../components/room/lobby/room-lobby';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/loading-screen';
import Layout from '../../../components/layout/layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RoomStateProvider from '../../../components/room/room-state-provider';
import {
  connectRoomSocket,
  createRoom,
  exitRoom,
  joinRoom,
  socketRemoveAllListeners,
} from '../../../libs/socket.io';
import AnimatedTextLayout from '../../../components/layout/animated-text-layout';
import TopbarLayout from '../../../components/layout/topbar-layout';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { createPeer, getMedia } from '../../../libs/peer';
import { Session } from 'next-auth';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';

const RoomHint = dynamic(
  () => import('../../../components/room/hint/room-hint'),
  {
    ssr: false,
  },
);
const RoomReasoning = dynamic(
  () => import('../../../components/room/reasoning/room-reasoning'),
  { ssr: false },
);

const Room = ({ userSession }: { userSession: Session }) => {
  const router = useRouter();
  const roomId = router.query.id;
  const roomUniqueId = router.query.roomUniqueId;
  const roomState = router.query.state;

  const [state, dispatch] = useRoomContext();
  const { roomInfo, peers, currentUsers, messageList, myStreamInfo } = state;
  const streamIntervalRef = useRef<NodeJS.Timer>();

  const onBeforeUnload = () => {
    console.log(userSession.userId);
    exitRoom({ roomId: router.query.id, userId: userSession.userId });
    socketRemoveAllListeners();
  };

  useEffect(() => {
    connectRoomSocket(dispatch);
    if (!roomInfo) {
      if (router.query.roomUniqueId) {
        createRoom({ roomId, roomUniqueId });
      } else {
        joinRoom({
          roomId,
          userId: userSession.userId,
          email: userSession.email,
          nickname: userSession.nickname,
        });
      }
    }

    router.beforePopState(() => {
      onBeforeUnload();
      router.reload();
      return false;
    });

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  // useUpdateEffect(() => {
  //   console.log('myStream updated:', myStream);
  //   if (myStream && peers.length === 0) {
  //     peerJoin({ roomId: roomId });
  //     afterUpdateStream(`${userSession.userSessionId}`, myStream, peers, dispatch);
  //   }
  // }, [myStream]);

  useUpdateEffect(() => {
    clearInterval(streamIntervalRef.current);
    streamIntervalRef.current = setInterval(() => {
      if (myStreamInfo.stream) {
        const videoTrack = myStreamInfo.stream.getVideoTracks()[0];
        if (videoTrack.readyState === 'ended') {
          getMedia({
            video: {
              ...myStreamInfo.videoTrackconstraints,
              deviceId: myStreamInfo.videoDeviceId,
            },
            audio: {
              ...myStreamInfo.audioTrackconstraints,
              deviceId: myStreamInfo.audioDeviceId,
            },
          }).then(stream => {
            dispatch({ type: 'MY_STREAM', payload: stream });
          });
        }
      }
    }, 100);
  }, [myStreamInfo]);

  useUpdateEffect(() => {
    console.log('peers updated:');
    console.log(peers);
  }, [peers]);

  useUpdateEffect(() => {
    // console.log(userSession);
    console.log(currentUsers);
    // if (
    //   currentUsers.find(cUser => cUser.userId === userSession.userId)
    //     ?.streamId &&
    //   !peers.find(peer => +peer.userId === userSession.userId)
    // ) {
    //   if (myStreamInfo.stream) {
    //     createPeer(`${userSession.userId}`, myStreamInfo.stream);
    //   }
    // }
  }, [currentUsers]);

  useUpdateEffect(() => {
    if (messageList.length > 150) {
      dispatch({ type: 'SHIFT_MESSAGE' });
    }
  }, [messageList]);

  useUpdateEffect(() => {
    console.log(roomInfo);
  }, [roomInfo]);

  if (!roomInfo) return <LoadingScreen fullScreen />;

  return (
    <Layout title={roomInfo.title}>
      <AnimatedTextLayout>
        <div className="w-full h-full bg-crumpled-paper object-cover">
          <TopbarLayout>
            {roomState === 'hint' ? (
              <Suspense fallback={<LoadingScreen fullScreen />}>
                <RoomHint />
              </Suspense>
            ) : roomState === 'reasoning' ? (
              <Suspense fallback={<LoadingScreen fullScreen />}>
                <DndProvider backend={HTML5Backend}>
                  <RoomReasoning />
                </DndProvider>
              </Suspense>
            ) : (
              <RoomLobby />
            )}
          </TopbarLayout>
        </div>
      </AnimatedTextLayout>
    </Layout>
  );
};

const RoomPage = ({ userSession }: { userSession: Session }) => (
  <RoomStateProvider>
    <Room {...{ userSession }} />
  </RoomStateProvider>
);

export default RoomPage;

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

  const referer = req.headers.referer;
  console.log(referer);
  if (!referer) {
    return {
      redirect: {
        destination: '/error/access-denied',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userSession: session,
    },
  };
};
