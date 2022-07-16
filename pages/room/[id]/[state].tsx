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
import SocketComponent, { socket } from '../../../components/room/socket';
import { RecoilRoot, useRecoilState } from 'recoil';
import { currentUsersState, roomInfoState } from '../../../libs/client/room';

const RoomHint = dynamic(() => import('../../../components/room/room-hint'), {
  ssr: false,
});
const RoomReasoning = dynamic(
  () => import('../../../components/room/reasoning/room-reasoning'),
  { ssr: false },
);

const Room = ({ user }: { user: UserSession }) => {
  const router = useRouter();
  const { id: roomId, state: roomState, roomUniqueId } = router.query;
  const dataToSendToServer = { roomId, userId: user.id };

  const [roomInfo] = useRecoilState(roomInfoState);
  const [currentUsers] = useRecoilState(currentUsersState);

  const onBeforeUnload = () => {
    socket.emit('exit_room', dataToSendToServer);
    socket.removeAllListeners();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    router.beforePopState(() => {
      onBeforeUnload();
      router.replace('/');
      return false;
    });

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log(roomInfo);
  }, [roomInfo]);
  useEffect(() => {
    console.log(currentUsers);
  }, [currentUsers]);
  return (
    <SocketComponent {...{ user, roomUniqueId, roomId }}>
      <Layout>
        {roomState === 'hint' ? (
          <Suspense fallback={<LoadingScreen />}>
            <RoomHint user={user} />
          </Suspense>
        ) : roomState === 'reasoning' ? (
          <Suspense fallback={<LoadingScreen />}>
            <DndProvider backend={HTML5Backend}>
              <RoomReasoning />
            </DndProvider>
          </Suspense>
        ) : (
          <RoomLobby user={user} />
        )}
      </Layout>
    </SocketComponent>
  );
};

export default function RecoilRootRoom({ user }: { user: UserSession }) {
  return (
    <RecoilRoot>
      <Room user={user} />
    </RecoilRoot>
  );
}

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

  // if (!req.headers.referer) {
  //   return {
  //     redirect: {
  //       destination: '/error/access-denied',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      user: session,
    },
  };
};
