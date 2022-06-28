import { getSession, useSession, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useState } from 'react';

export default function Home(props: any) {
  const session = useSession();
  const router = useRouter();
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    if (session) {
      console.log(session);

      // socket?.emit('room:list', (data: any) => {
      //   console.log(data);
      // setRoomList(data);
      // });
    }
  }, []);

  const logoutHandler = () => {
    alert('로그아웃 되었습니다.');
    signOut();
    router.replace('/');
  };

  const createRoom: FormEventHandler = e => {
    e.preventDefault();
    router.push(`/room/${1}`);
  };

  return (
    <div>
      <div>
        <span>{session?.data?.user?.name}</span>
        <span>{session?.data?.user?.email}</span>
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

  return {
    props: {
      session,
    },
  };
};
