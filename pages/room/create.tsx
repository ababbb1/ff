import AnimatedTextLayout from '../../components/animatedTextLayout';
import Layout from '../../components/layout';
import RoomForm, { RoomFormData } from '../../components/roomForm';
import { Session } from 'next-auth';

export default function CreateRoom({ user }: { user: Session }) {
  const episodes = ['대저택 살인사건'];

  const onValid = (data: RoomFormData) => {
    console.log(data);
  };

  return (
    <Layout>
      <AnimatedTextLayout>
        <RoomForm
          {...{ episodes, onValid, master: (user.email as string) || '' }}
        />
      </AnimatedTextLayout>
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
      user: session,
    },
  };
};
