import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_DOMAIN } from '../../../libs/client/api';
import { RoomData, UserSession } from '../../../libs/types/user';
import RoomLobby from '../../../components/room/room-lobby';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/loading-screen';
import Layout from '../../../components/layout';

const RoomHint = dynamic(() => import('../../../components/room/room-hint'), {
  ssr: false,
});
const RoomReasoning = dynamic(
  () => import('../../../components/room/room-reasoning'),
  { ssr: false },
);

export default function Room({ user }: { user: UserSession }) {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<RoomData>();
  const { id: roomId, state: roomState, roomUniqueId } = router.query;

  const socket = io(API_DOMAIN, {
    transports: ['websocket'],
    closeOnBeforeunload: false,
  });

  const updateRoomInfoHandler = (data: { roomInfo: RoomData }) => {
    setRoomInfo(data.roomInfo);
  };

  const onBeforeUnload = () => {
    socket.emit('exit_room', { roomId, userId: user.id });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    router.beforePopState(() => {
      socket.emit('exit_room', { roomId, userId: user.id });
      router.replace('/');
      return false;
    });

    if (roomUniqueId) {
      socket.emit('create_room', { roomId, roomUniqueId });
    } else {
      socket.emit('join_room', {
        userId: user.id,
        roomId,
        email: user.email,
        nickname: user.nickname,
      });
    }

    socket.on('update_room', updateRoomInfoHandler);

    return () => {
      socket.off('update_room', updateRoomInfoHandler);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <Layout>
      {roomState === 'hint' ? (
        <Suspense fallback={<LoadingScreen />}>
          <RoomHint {...{ roomInfo }} />
        </Suspense>
      ) : roomState === 'reasoning' ? (
        <Suspense fallback={<LoadingScreen />}>
          <RoomReasoning />
        </Suspense>
      ) : (
        <RoomLobby
          {...{
            user,
            roomInfo,
            socket,
          }}
        />
      )}
    </Layout>
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
