import { getSession, useSession, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const logoutHandler = () => {
    alert('로그아웃 되었습니다.');
    signOut();
    router.replace('/');
  };

  return (
    <div>
      <span>{session?.data?.user?.name}</span>
      <button onClick={logoutHandler}>로그아웃</button>
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
  console.log(session);

  return {
    props: {
      session,
    },
  };
};
