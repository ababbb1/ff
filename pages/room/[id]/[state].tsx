import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react';
import { UserSession } from '../../../libs/types/user';
import RoomLobby from '../../../components/room/room-lobby';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/loading-screen';
import Layout from '../../../components/layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RoomStateProvider from '../../../components/room/room-state-provider';
import {
  connectRoomSocket,
  createRoom,
  exitRoom,
  joinRoom,
  socketRemoveAllListeners,
} from '../../../libs/client/socket.io';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';

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

  const roomContext = useRoomContext();

  const onBeforeUnload = () => {
    exitRoom({ roomId: router.query.id, userId: user.id });
    socketRemoveAllListeners();
  };

  // useEffect
  useEffect(() => {
    connectRoomSocket(roomContext[1]);

    if (router.query.roomUniqueId) {
      createRoom({ roomId, roomUniqueId });
    } else {
      joinRoom({
        roomId,
        userId: user.id,
        email: user.email,
        nickname: user.nickname,
      });
    }

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

  // useEffect(() => {
  //   console.log(roomInfo);
  // }, [roomInfo]);
  // useEffect(() => {
  //   console.log(currentUsers);
  // }, [currentUsers]);

  return (
    <Layout>
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
