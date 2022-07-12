import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import API, { authHeaders } from '../../libs/client/api';
import { useRouter } from 'next/router';
import { UserSession } from '../../libs/types/user';
import AnimatedTextLayout from '../../components/animated-text-layout';
import Layout from '../../components/layout';
import RoomForm, { RoomFormData } from '../../components/room/room-form';

export default function CreateRoom({ user }: { user: UserSession }) {
  const episodes = ['대저택 살인사건'];
  const router = useRouter();

  const onValid = async (data: RoomFormData) => {
    const res = await API.post('room/create', data, {
      headers: authHeaders(user.token),
    });

    if (res.data.result.success) {
      router.replace(
        `/room/${res.data.result.id}/lobby/?roomUniqueId=${res.data.result.roomUniqueId}`,
        `/room/${res.data.result.id}/lobby`,
      );
    } else {
      alert('방 생성에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <Layout>
      <AnimatedTextLayout>
        <RoomForm {...{ episodes, onValid, master: user.email || '' }} />
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
