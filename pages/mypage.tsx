import { GetServerSideProps } from 'next';
import { getSession, useSession, signOut } from 'next-auth/react';
import AnimatedTextLayout from '../components/animatedTextLayout';
import Layout from '../components/layout';

export default function Mypage() {
  const session = useSession();

  const logoutHandler = () => {
    alert('로그아웃 되었습니다.');
    signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <span>{session?.data?.user?.name}</span>
          <span>{session?.data?.user?.email}</span>
          <button onClick={logoutHandler}>로그아웃</button>
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
