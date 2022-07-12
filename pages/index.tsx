import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animated-text-layout';
import Link from 'next/link';
import ModalLayout from '../components/modal-layout';
import { RoomData, UserSession } from '../libs/types/user';
import API, { authHeaders } from '../libs/client/api';
import { useQuery } from 'react-query';
import LoadingScreen from '../components/loading-screen';
import RoomSearch from '../components/room/room-search';
import { useState } from 'react';

interface Props {
  user: UserSession;
  initRoomList: RoomData[];
}

export default function Home({ user }: Props) {
  const { isLoading, data } = useQuery(
    'getRoomListAll',
    () => API.get('rooms', { headers: authHeaders(user.token) }),
    {
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
    },
  );
  const roomList = data?.data.result.roomList;

  const [searchModal, setSearchModal] = useState<boolean>(false);

  if (isLoading) return <LoadingScreen />;

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <span>{user.nickname} 님</span>
          <Link href={'/mypage'}>마이페이지</Link>
          <div>
            <div>방목록</div>
            <ul>
              {!roomList ? (
                <div>아직 방이 없습니다.</div>
              ) : (
                roomList.map((v: RoomData) => (
                  <li key={`room${v.id}`} className="w-30 h-20 bg-red-300">
                    <span>{v.title}</span>
                    <Link href={`/room/${v.id}/lobby`}>입장</Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <button onClick={() => setSearchModal(!searchModal)}>방찾기</button>
          <Link href={'/room/create'}>방만들기</Link>
        </div>

        {searchModal && (
          <ModalLayout
            background="dark"
            closeHandler={() => {
              setSearchModal(!searchModal);
            }}
          >
            <RoomSearch {...{ user }} />
          </ModalLayout>
        )}
      </AnimatedTextLayout>
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

  return {
    props: {
      user: session,
    },
  };
};
