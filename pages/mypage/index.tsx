import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { UserSession } from '../../libs/types/user';
import AnimatedTextLayout from '../../components/animated-text-layout';
import Layout from '../../components/layout';
import { signOut } from 'next-auth/react';

export default function Mypage({ user }: { user: UserSession }) {
  const logoutHandler = () => {
    alert('로그아웃 되었습니다.');
    signOut();
  };

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <span>{user.nickname}</span>
          <span>{user.email}</span>
          <span>{user.social ? 'social' : 'local'}</span>
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
      user: session,
    },
  };
};
