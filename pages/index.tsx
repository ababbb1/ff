import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import RoomSearchForm from '../components/roomSearchForm';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animatedTextLayout';
import Link from 'next/link';
import ModalLayout from '../components/modalLayout';
import { RoomData, UserSession } from '../libs/types/user';
import axios from 'axios';
import { API_DOMAIN, authHeaders } from '../libs/client/api';

interface Props {
  user: UserSession;
  roomList: RoomData[];
}

export default function Home({ user, roomList }: Props) {
  const router = useRouter();

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
              {roomList.map(v => (
                <li key={`room${v.id}`} className="w-30 h-20 bg-red-300">
                  <span>{v.title}</span>
                  <Link href={`/room/${v.id}`}>
                    <a>입장</a>
                  </Link>
                </li>
              ))}
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
              <RoomSearchForm />
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

  const getRoomsResponse = await axios({
    method: 'get',
    url: `${API_DOMAIN}/api/rooms`,
    headers: { ...authHeaders(session.token as string) },
  });

  console.log(getRoomsResponse.data);

  return {
    props: {
      user: session,
      roomList: getRoomsResponse.data.result.roomList || [],
    },
  };
};
