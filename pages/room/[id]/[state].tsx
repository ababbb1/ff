import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react';
import { UserSession } from '../../../libs/types/user';
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
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import AnimatedTextLayout from '../../../components/layout/animated-text-layout';
import TopbarLayout from '../../../components/layout/topbar-layout';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { useRef } from 'react';
import { createPeer, getMedia } from '../../../libs/peer';

const RoomHint = dynamic(() => import('../../../components/room/room-hint'), {
  ssr: false,
});
const RoomReasoning = dynamic(
  () => import('../../../components/room/reasoning/room-reasoning'),
  { ssr: false },
);

const Room = ({ user }: { user: UserSession }) => {
  console.log('user:', user);
  const router = useRouter();
  const roomId = router.query.id;
  const roomUniqueId = router.query.roomUniqueId;
  const roomState = router.query.state;

  const [state, dispatch] = useRoomContext();
  const { roomInfo, peers, currentUsers, messageList, myStreamInfo } = state;
  const streamIntervalRef = useRef<NodeJS.Timer>();

  const onBeforeUnload = () => {
    exitRoom({ roomId: router.query.id, userId: user.userId });
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
          userId: user.userId,
          email: user.email,
          nickname: user.nickname,
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
  //     afterUpdateStream(`${user.userId}`, myStream, peers, dispatch);
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
    console.log(currentUsers);
    if (
      currentUsers.find(cUser => cUser.userId === user.userId)?.streamId &&
      !peers.find(peer => +peer.userId === user.userId)
    ) {
      if (myStreamInfo.stream) {
        createPeer(`${user.userId}`, myStreamInfo.stream);
      }
    }
  }, [currentUsers]);

  useUpdateEffect(() => {
    if (messageList.length > 150) {
      dispatch({ type: 'SHIFT_MESSAGE' });
    }
  }, [messageList]);

  if (!roomInfo) return <LoadingScreen fullScreen />;

  return (
    <Layout title={roomInfo.title}>
      <AnimatedTextLayout>
        <div className="w-full h-full bg-crumpled-paper object-cover">
          <TopbarLayout {...{ user, roomInfo }}>
            {roomState === 'hint' ? (
              <Suspense fallback={<LoadingScreen fullScreen />}>
                <RoomHint
                  {...{
                    user,
                  }}
                />
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

const RoomPage = ({ user }: { user: UserSession }) => (
  <RoomStateProvider>
    <Room {...{ user }} />
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
      user: session,
    },
  };
};
