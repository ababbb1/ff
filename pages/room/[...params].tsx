import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ModalLayout from '../../components/modalLayout';
import { Suspense, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_DOMAIN } from '../../libs/client/api';
import { RoomData, UserSession } from '../../libs/types/user';
import RoomReady from '../../components/roomReady';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../components/loadingScreen';
import RoomForm, { RoomFormData } from '../../components/roomForm';

const RoomHint = dynamic(() => import('../../components/roomHint'));
const RoomReasoning = dynamic(() => import('../../components/roomReasoning'));

export default function Room({ user }: { user: UserSession }) {
  const router = useRouter();
  const [isSetting, setIsSetting] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [roomInfo, setRoomInfo] = useState<RoomData>();
  const isMaster = roomInfo?.master === user.nickname;

  const roomUniqueId = router.query.roomUniqueId;
  const queryParams = router.query.params as string[];
  const roomId = queryParams[0];
  const roomState = queryParams[1];

  const socket = io(API_DOMAIN, { transports: ['websocket'] });

  const preventUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const submitMessage = () => {
    socket.emit('submit_chat', {
      message,
      nickname: user.nickname,
      roomId,
    });

    setMessage('');
  };

  const receiveMessage = ({ message }: any) => {
    setMessageList(prev => [...prev, message]);
  };

  const settingButtonHandler = () => {
    setIsSetting(true);
  };

  const updateRoomInfo = (data: any) => {
    console.log('data:', data);
    setRoomInfo(data.roomInfo);
  };

  const onSettingFormValid = async (data: RoomFormData) => {
    socket.emit('update_room', { data });
    setIsSetting(false);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventUnload);

    if (socket) {
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

      socket.on('new_chat', receiveMessage);
      socket.on('update_room', updateRoomInfo);
    }

    return () => {
      window.removeEventListener('beforeunload', preventUnload);
      socket.off('new_chat', receiveMessage);
      socket.off('update_room', updateRoomInfo);
    };
  }, []);

  if (roomState === 'hint')
    return (
      <Suspense fallback={<LoadingScreen visible />}>
        <RoomHint />
      </Suspense>
    );
  if (roomState === 'reasoning')
    return (
      <Suspense fallback={<LoadingScreen visible />}>
        <RoomReasoning />
      </Suspense>
    );

  return (
    <>
      <RoomReady
        {...{
          settingButtonHandler,
          roomId,
          messageList,
          message,
          setMessage,
          submitMessage,
          isMaster,
        }}
      />
      {isSetting && (
        <ModalLayout
          background="dark"
          onClose={() => {
            setIsSetting(false);
          }}
        >
          <div className="w-[80%] h-[80%]">
            <RoomForm
              initData={roomInfo}
              master={user.nickname}
              onValid={onSettingFormValid}
            />
          </div>
        </ModalLayout>
      )}
    </>
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
  //       destination: '/error/access_denied',
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
