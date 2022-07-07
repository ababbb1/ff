import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ModalLayout from '../../components/modalLayout';
import { Suspense, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_DOMAIN } from '../../libs/client/api';
import { UserSession } from '../../libs/types/user';
import RoomReady from '../../components/roomReady';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../components/loadingScreen';

const RoomHint = dynamic(() => import('../../components/roomHint'));
const RoomReasoning = dynamic(() => import('../../components/roomReasoning'));

export default function Room({ user }: { user: UserSession }) {
  const router = useRouter();
  const [isSetting, setIsSetting] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const roomUniqueId = router.query.roomUniqueId;
  const queryParams = router.query.params as string[];

  const socket = io(API_DOMAIN, { transports: ['websocket'] });

  const preventUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const submitMessage = () => {
    socket.emit('submit_chat', {
      message,
      nickname: user.nickname,
      roomId: queryParams[0],
    });

    setMessage('');
  };

  const receiveMessage = ({ message }: { message: string }) => {
    console.log(message);
    setMessageList(prev => [...prev, message]);
  };

  const settingButtonHandler = () => {
    setIsSetting(true);
  };

  useEffect(() => {
    console.log(roomUniqueId);
    // window.addEventListener('beforeunload', preventUnload);

    if (socket) {
      if (roomUniqueId) {
        socket.emit('create_room', { roomUniqueId });
      } else {
        socket.emit('join_room', {
          userId: user.id,
          roomId: queryParams[0],
          email: user.email,
          nickname: user.nickname,
        });
      }

      socket.on('new_chat', receiveMessage);
    }

    return () => {
      // window.removeEventListener('beforeunload', preventUnload);
      socket.off('new_chat', receiveMessage);
    };
  }, []);

  if (queryParams[1] === 'hint')
    return (
      <Suspense fallback={<LoadingScreen visible />}>
        <RoomHint />
      </Suspense>
    );
  if (queryParams[1] === 'reasoning')
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
          queryParams,
          messageList,
          message,
          setMessage,
          submitMessage,
        }}
      />
      {isSetting && (
        <ModalLayout
          background="dark"
          onClose={() => {
            setIsSetting(false);
          }}
        >
          <div className="bg-white w-[50rem] h-[40rem]">setting</div>
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

  if (!req.headers.referer) {
    return {
      redirect: {
        destination: '/error/access_denied',
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
