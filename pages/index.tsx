import { getSession, useSession, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const socket = io('http://localhost:3001');
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    if (session) {
      console.log(session);

      socket?.emit('room:list', (data: any) => {
        console.log(data);
        // setRoomList(data);
      });
    }
  }, []);

  const logoutHandler = () => {
    alert('로그아웃 되었습니다.');
    signOut();
    router.replace('/');
  };

  const createRoom: FormEventHandler = e => {
    e.preventDefault();
    socket?.emit(
      'room:create',
      { master: session?.data?.user?.name },
      (num: number) => {
        router.push(
          { pathname: `/room/${num}`, query: { roomNum: num } },
          `/room/${num}`,
        );
      },
    );
  };

  return (
    <div>
      <div>
        <span>{session?.data?.user?.name}</span>
        <button onClick={logoutHandler}>로그아웃</button>
      </div>
      <div>
        <div>방목록</div>
        <div>
          {roomList?.map(x => (
            <div key={x}>{x}</div>
          ))}
        </div>
      </div>
      <form onSubmit={createRoom}>
        <button>방만들기</button>
      </form>
    </div>
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

  console.log(session);

  return {
    props: {
      session,
    },
  };
};
