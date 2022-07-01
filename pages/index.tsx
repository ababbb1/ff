import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import RoomSearchForm from '../components/roomSearchForm';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animatedTextLayout';
import Link from 'next/link';
import ModalLayout from '../components/modalLayout';
import { Session } from 'next-auth';

export default function Home({ user }: { user: Session }) {
  const router = useRouter();

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <span>{user.nickname as string} 님</span>
          <Link href={'/mypage'}>
            <button>마이페이지</button>
          </Link>
          <div>
            <div>방목록</div>
          </div>
          <Link href={'/?search=1'} as={'/search'} scroll={false}>
            <button>방찾기</button>
          </Link>
          <Link href={'/room/create'}>
            <button>방만들기</button>
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

  return {
    props: {
      user: session,
    },
  };
};
