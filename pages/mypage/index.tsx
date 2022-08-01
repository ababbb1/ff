import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AnimatedTextLayout from '../../components/layout/animated-text-layout';
import Layout from '../../components/layout/layout';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export default function Mypage({ user }: { user: Session }) {
  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    signOut();
  };

  return (
    <Layout>
      <AnimatedTextLayout>
        <div>
          <span>{user.nickname}</span>
          <span>{user.email}</span>
          <button onClick={handleLogout}>로그아웃</button>
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
