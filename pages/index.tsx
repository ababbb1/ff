import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../components/layout/layout';
import AnimatedTextLayout from '../components/layout/animated-text-layout';
import API, { authHeaders } from '../libs/api';
import { useQuery } from 'react-query';
import LoadingScreen from '../components/loading-screen';
import { useState } from 'react';
import MainpageInterface from '../components/mainpage/mainpage-interface';
import ModalLayout from '../components/modal-layout';
import { Session } from 'next-auth';
import RoomSearch from '../components/room/room-search/room-search';

interface Props {
  userSession: Session;
}

export default function Home({ userSession }: Props) {
  const { isLoading, data } = useQuery(
    'getRoomListAll',
    () => API.get('room/list', { headers: authHeaders(userSession.token) }),
    {
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
    },
  );

  const roomList = data?.data.result?.roomList || [];
  const [searchModal, setSearchModal] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleSearchButton = () => {
    setSearchModal(true);
  };

  const handleLogoLoaded = () => {
    setLogoLoaded(true);
  };

  if (isLoading) return <LoadingScreen fullScreen />;

  return (
    <Layout>
      <AnimatedTextLayout>
        <div className="flex flex-col w-full h-full border-black">
          <div className="w-full px-32 py-10 h-full max-h-[42%] 2xl:max-h-[45%] flex justify-center items-center">
            <div
              className={`transition-all delay-300 duration-1000 ${
                logoLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'
              }`}
            >
              <img
                src="/assets/mainpage-logo.webp"
                alt="mainpage-logo"
                onLoad={handleLogoLoaded}
              />
            </div>
          </div>
          <MainpageInterface
            roomList={roomList}
            searchButtonHandler={handleSearchButton}
          />
        </div>

        <ModalLayout
          background="dark"
          handleClose={() => {
            setSearchModal(false);
          }}
          isActive={searchModal}
        >
          <RoomSearch {...{ setSearchModal }} />
        </ModalLayout>
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
      userSession: session,
    },
  };
};
