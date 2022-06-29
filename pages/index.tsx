import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animatedTextLayout';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const createRoom: FormEventHandler = e => {
    e.preventDefault();
    router.push(`/room/${1}`);
  };

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <Link href={'/mypage'}>
            <button>마이페이지</button>
          </Link>
          <div>
            <div>방목록</div>
            <div></div>
          </div>
          <form onSubmit={createRoom}>
            <Link href={'/room/create'}>
              <button>방만들기</button>
            </Link>
          </form>
        </div>
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
      session,
    },
  };
};
