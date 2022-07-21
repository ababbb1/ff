import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../components/layout';
import AnimatedTextLayout from '../components/animated-text-layout';
import { UserSession } from '../libs/types/user';
import API, { authHeaders } from '../libs/client/api';
import { useQuery } from 'react-query';
import LoadingScreen from '../components/loading-screen';
import RoomSearch from '../components/room/room-search';
import { Suspense, useState } from 'react';
import { RoomData } from '../libs/types/room';
import dynamic from 'next/dynamic';
import useToggle from '../libs/hooks/useToggle';
import MainpageInterface from '../components/mainpage/mainpage-interface';

const ModalLayout = dynamic(() => import('../components/modal-layout'), {
  ssr: false,
});

interface Props {
  user: UserSession;
  initRoomList: RoomData[];
}

export default function Home({ user }: Props) {
  const { isLoading, data } = useQuery(
    'getRoomListAll',
    () => API.get('rooms', { headers: authHeaders(user.token) }),
    {
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
    },
  );
  const roomList = data?.data.result?.roomList;
  const [searchModal, toggleSearchModal] = useToggle();
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleSearchButton = () => {
    toggleSearchModal(true);
  };

  const handleLogoLoaded = () => {
    setLogoLoaded(true);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Layout>
      <AnimatedTextLayout>
        <div className="flex flex-col w-full h-full border-black">
          <div className="w-full px-32 py-10 max-h-[45%] flex justify-center items-center">
            {/* <MainpageLogoLarge /> */}
            <div
              className={`transition-all delay-[400ms] duration-1000 ${
                logoLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'
              }`}
            >
              <img
                src="/assets/mainpage-logo.png"
                alt="mainpage-logo"
                onLoad={handleLogoLoaded}
              />
            </div>
          </div>
          <MainpageInterface
            user={user}
            roomList={roomList}
            searchButtonHandler={handleSearchButton}
          />
        </div>

        {searchModal && (
          <Suspense>
            <ModalLayout
              background="dark"
              handleClose={() => {
                toggleSearchModal(false);
              }}
            >
              <RoomSearch {...{ user }} />
            </ModalLayout>
          </Suspense>
        )}
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
