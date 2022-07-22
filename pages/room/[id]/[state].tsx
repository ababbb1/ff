import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react';
import { UserSession } from '../../../libs/types/user';
import RoomLobby from '../../../components/room/room-lobby';
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
  onAfterUpdatePeerConnection,
  socketRemoveAllListeners,
} from '../../../libs/socket.io';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { getMedia, makePeerConnection } from '../../../libs/media';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import useTimeout from '../../../libs/hooks/useTimeout';
import AnimatedTextLayout from '../../../components/layout/animated-text-layout';
import TopbarLayout from '../../../components/layout/topbar-layout';

const RoomHint = dynamic(() => import('../../../components/room/room-hint'), {
  ssr: false,
});
const RoomReasoning = dynamic(
  () => import('../../../components/room/reasoning/room-reasoning'),
  { ssr: false },
);

const Room = ({ user }: { user: UserSession }) => {
  const router = useRouter();
  const roomId = router.query.id;
  const roomUniqueId = router.query.roomUniqueId;
  const roomState = router.query.state;

  const [state, dispatch] = useRoomContext();
  const { roomInfo, myStream, peerConnection } = state;

  const onBeforeUnload = () => {
    exitRoom({ roomId: router.query.id, userId: user.id });
    socketRemoveAllListeners();
  };

  useTimeout(() => {
    if (!roomInfo) {
      alert('연결에 실패했습니다.');
      router.back();
    }
  }, 4000);

  useEffect(() => {
    getMedia(dispatch);
    connectRoomSocket(dispatch);

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

  useUpdateEffect(() => {
    if (myStream) {
      makePeerConnection(roomId as string, myStream, dispatch);
    }
    if (myStream && !roomInfo) {
      if (router.query.roomUniqueId) {
        createRoom({ roomId, roomUniqueId, streamId: myStream.id });
      } else {
        joinRoom({
          roomId,
          userId: user.id,
          email: user.email,
          nickname: user.nickname,
          streamId: myStream.id,
        });
      }
    }
  }, [myStream]);

  useUpdateEffect(() => {
    if (peerConnection && typeof roomId === 'string') {
      onAfterUpdatePeerConnection(peerConnection, roomId);
    }
  }, [peerConnection]);

  if (!roomInfo) return <LoadingScreen />;
  return (
    <Layout title={roomInfo.title}>
      <AnimatedTextLayout>
        <TopbarLayout {...{ user, roomInfo }}>
          {roomState === 'hint' ? (
            <Suspense fallback={<LoadingScreen />}>
              <RoomHint
                {...{
                  user,
                }}
              />
            </Suspense>
          ) : roomState === 'reasoning' ? (
            <Suspense fallback={<LoadingScreen />}>
              <DndProvider backend={HTML5Backend}>
                <RoomReasoning />
              </DndProvider>
            </Suspense>
          ) : (
            <RoomLobby
              {...{
                user,
              }}
            />
          )}
        </TopbarLayout>
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
