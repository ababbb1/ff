import AnimatedTextLayout from '../../components/animatedTextLayout';
import Layout from '../../components/layout';

export default function CreateRoom() {
  return (
    <Layout>
      <AnimatedTextLayout></AnimatedTextLayout>
    </Layout>
  );
}

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

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
