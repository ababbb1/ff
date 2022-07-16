import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animated-text-layout';
import Link from 'next/link';
import { UserSession } from '../libs/types/user';
import API, { authHeaders } from '../libs/client/api';
import { useQuery } from 'react-query';
import LoadingScreen from '../components/loading-screen';
import RoomSearch from '../components/room/room-search';
import { Suspense, useState } from 'react';
import { RoomData } from '../libs/types/room';
import dynamic from 'next/dynamic';
import useToggle from '../libs/hooks/useToggle';

const ModalLayout = dynamic(() => import('../components/modal-layout'), {
  ssr: false,
});

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
  const roomList = data?.data.result?.roomList;

  const [searchModal, toggleSearchModal] = useToggle();

  if (isLoading) return <LoadingScreen />;

  return (
    <Layout>
      <AnimatedTextLayout>
        <div className="flex flex-col">
          <Link href={'/mypage'}>마이페이지</Link>
          <button onClick={() => toggleSearchModal(true)} className="text-left">
            방찾기
          </button>
          <Link href={'/room/create'}>방만들기</Link>
          <div>
            <div>방목록</div>
            <ul>
              {!roomList ? (
                <div>아직 방이 없습니다.</div>
              ) : (
                roomList.map((v: RoomData) => (
                  <li
                    key={`room${v.id}`}
                    className="bg-red-300 border border-black flex flex-col"
                  >
                    <span>{`title: ${v.title}`}</span>
                    <span>{`방장: ${v.master}`}</span>
                    <span>{`상태: ${v.roomState}`}</span>
                    <Link href={`/room/${v.id}/lobby`}>입장</Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {searchModal && (
          <Suspense>
            <ModalLayout
              background="dark"
              handleClose={() => {
                toggleSearchModal(false);
              }}
            >
              <RoomSearch {...{ user }} />
            </ModalLayout>
          </Suspense>
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
