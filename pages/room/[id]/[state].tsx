import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useRef } from 'react';
import RoomLobby from '../../../components/room/lobby/room-lobby';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/loading-screen';
import Layout from '../../../components/layout/layout';
import RoomStateProvider from '../../../components/room/room-state-provider';
import {
  connectRoomSocket,
  createRoom,
  exitRoom,
  getRoles,
  joinRoom,
  socketRemoveAllListeners,
} from '../../../libs/socket.io';
import AnimatedTextLayout from '../../../components/layout/animated-text-layout';
import TopbarLayout from '../../../components/layout/topbar-layout';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { getMedia } from '../../../libs/peer';
import { Session } from 'next-auth';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import ScrollObserver from '../../../components/scroll-observer';
import DndProvider from '../../../components/dnd-provider';

const RoomHint = dynamic(
  () => import('../../../components/room/hint/room-hint'),
  { suspense: true },
);
const RoomReasoning = dynamic(
  () => import('../../../components/room/reasoning/room-reasoning'),
  { suspense: true },
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
    console.log('before unload');
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

    getRoles();
    // reasoningTime({ roomId: 1 });
    // hintPostOnBoard({ imageInfo: { id: '111', x: 1, y: 1 }, roomId: 1 });
    // choiceRole({ roomId: 1, selectedUserId: 1, role: 1 });
    // forceQuit({ roomId: 111, exitedUserId: 111 });
    // gameEnd({ roomId: 1 });

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

    if (!currentUsers.find(cUser => cUser.userId === userSession.userId)) {
      alert('방장에의해 추방 당했습니다.');
      router.back();
    }
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
                <ScrollObserver>
                  <DndProvider>
                    <RoomReasoning />
                  </DndProvider>
                </ScrollObserver>
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
