import AnimatedTextLayout from '../../components/animatedTextLayout';
import Layout from '../../components/layout';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';

export default function Mypage() {
  const session = useSession();
  console.log(session);

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
          <span>{session?.data?.nickname as string}</span>
          <span>{session?.data?.email as string}</span>
          <span>{(session?.data?.social as boolean) ? 'social' : 'local'}</span>
          <button onClick={logoutHandler}>로그아웃</button>
        </div>
      </AnimatedTextLayout>
    </Layout>
  );
}

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { API_DOMAIN, contentTypeHeaders } from '../../libs/client/api';
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

  // const res = await axios({
  //   method: 'post',
  //   url: `${API_DOMAIN}/api/mypage`,
  //   data: { token: session.token },
  //   headers: contentTypeHeaders,
  // });

  // console.log(res.data);

  return {
    props: {
      session,
    },
  };
};
