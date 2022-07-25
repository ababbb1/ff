import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import API, { authHeaders } from '../../libs/api';
import { useRouter } from 'next/router';
import { UserSession } from '../../libs/types/user';
import AnimatedTextLayout from '../../components/layout/animated-text-layout';
import Layout from '../../components/layout/layout';
import RoomForm, { RoomFormData } from '../../components/room-form/room-form';
import { useState } from 'react';
import { EpisodeInfo } from '../../libs/types/room';
import { EPISODES } from '../../libs/const';
import EpisodeSelecter from '../../components/room-form/episode-selecter';

export default function CreateRoom({ user }: { user: UserSession }) {
  const router = useRouter();

  const [currentEpisode, setCurrentEpisode] = useState<EpisodeInfo>(
    EPISODES[0],
  );

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

  const handleClose = () => router.back();

  return (
    <Layout title={'방 만들기'}>
      <AnimatedTextLayout>
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full">
            <EpisodeSelecter onChange={setCurrentEpisode} isActive />
          </div>
          <div className="w-1/2 h-full relative">
            <RoomForm
              {...{
                onValid,
                onClose: handleClose,
                master: user.nickname,
                currentEpisode,
              }}
            />
          </div>
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
