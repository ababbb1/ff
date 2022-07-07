import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  API_DOMAIN,
  authHeaders,
  contentTypeHeaders,
} from '../../libs/client/api';
import { useRouter } from 'next/router';
import { UserSession } from '../../libs/types/user';
import AnimatedTextLayout from '../../components/animatedTextLayout';
import Layout from '../../components/layout';
import RoomForm, { RoomFormData } from '../../components/roomForm';
import axios from 'axios';

export default function CreateRoom({ user }: { user: UserSession }) {
  const episodes = ['대저택 살인사건'];
  const router = useRouter();

  const onValid = async (data: RoomFormData) => {
    const res = await axios({
      method: 'post',
      url: `${API_DOMAIN}/api/room/create`,
      data,
      headers: { ...contentTypeHeaders, ...authHeaders(user.token) },
    });

    if (res.data.result.success) {
      router.replace(
        `/room/${res.data.result.id}/?roomUniqueId=${res.data.result.roomUniqueId}`,
        `/room/${res.data.result.id}`,
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
