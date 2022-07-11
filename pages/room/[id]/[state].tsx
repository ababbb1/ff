import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_DOMAIN } from '../../../libs/client/api';
import { RoomData, UserSession } from '../../../libs/types/user';
import RoomReady from '../../../components/room/room-ready';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/loading-screen';
import Layout from '../../../components/layout';
// import { preventUnload } from '../../libs/client/component/room';

const RoomHint = dynamic(() => import('../../../components/room/room-hint'));
const RoomReasoning = dynamic(
  () => import('../../../components/room/room-reasoning'),
);

export default function Room({ user }: { user: UserSession }) {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<RoomData>();
  const { id: roomId, state: roomState, roomUniqueId } = router.query;

  const socket = io(API_DOMAIN, { transports: ['websocket'] });

  const updateRoomInfoHandler = (data: any) => {
    console.log('data:', data);
    setRoomInfo(data.roomInfo);
  };

  useEffect(() => {
    console.log(router.query);
    // window.addEventListener('beforeunload', preventUnload);
    router.beforePopState(({ as }) => {
      if (!as.includes('room')) {
        socket.emit('exit_room', { roomId, userId: user.id });
        socket.disconnect();
      }
      return true;
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
      // window.removeEventListener('beforeunload', preventUnload);
      socket.off('update_room', updateRoomInfoHandler);
    };
  }, []);

  return (
    <Layout>
      {roomState === 'hint' ? (
        <Suspense fallback={<LoadingScreen visible />}>
          <RoomHint />
        </Suspense>
      ) : roomState === 'reasoning' ? (
        <Suspense fallback={<LoadingScreen visible />}>
          <RoomReasoning />
        </Suspense>
      ) : (
        <RoomReady
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
