import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import RoomSearchForm from '../components/room/room-search-form';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animated-text-layout';
import Link from 'next/link';
import ModalLayout from '../components/modal-layout';
import { RoomData, UserSession } from '../libs/types/user';
import { getRoomListRequest } from '../libs/client/api';
import { useQuery } from 'react-query';
import LoadingScreen from '../components/loading-screen';

interface Props {
  user: UserSession;
  initRoomList: RoomData[];
}

export default function Home({ user }: Props) {
  const router = useRouter();
  const { isLoading, data } = useQuery(
    'getRoomListAll',
    () => getRoomListRequest({ token: user.token }),
    {
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
    },
  );
  const roomList = data?.data.result.roomList;

  if (isLoading) return <LoadingScreen visible />;

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <span>{user.nickname} 님</span>
          <Link href={'/mypage'}>
            <button>마이페이지</button>
          </Link>
          <div>
            <div>방목록</div>
            <ul>
              {!roomList ? (
                <div>아직 방이 없습니다.</div>
              ) : (
                roomList.map((v: RoomData) => (
                  <li key={`room${v.id}`} className="w-30 h-20 bg-red-300">
                    <span>{v.title}</span>
                    <Link href={`/room/${v.id}/lobby`}>
                      <a>입장</a>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <Link href={'/?search=1'} as={'/search'} scroll={false}>
            <button>방찾기</button>
          </Link>
          <Link href={'/room/create'}>
            <button>방만들기</button>
          </Link>
          <Link href={'/room/1'}>
            <button>/room/1</button>
          </Link>
        </div>

        {router.query.search && (
          <ModalLayout
            background="dark"
            onClose={() => {
              router.back();
            }}
          >
            <div className="bg-white w-[50rem] h-[40rem]">
              <RoomSearchForm {...{ user }} />
            </div>
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
