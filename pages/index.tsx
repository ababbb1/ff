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
import Image from 'next/image';
import { getBrowser } from '../libs/utils';
import MobileDetect from 'mobile-detect';

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
    <>
      <Layout>
        <AnimatedTextLayout>
          <div className="flex flex-col w-full h-full border-black">
            <div className="w-full px-4 py-8 2xl:py-10 h-[20rem] 2xl:h-[26rem] flex flex-col gap-1 items-center z-[13] relative">
              <div className="absolute -right-[10rem] 2xl:-right-[17rem] top-0 w-1/2 h-full z-[12] animate-[mainpage-magnifying-glass-sm_infinite_14s] 2xl:animate-[mainpage-magnifying-glass_infinite_14s]">
                <Image
                  src="/assets/mainpage-magnifying-glass.png"
                  layout="fill"
                  alt="magnifying-glass"
                />
              </div>
              <div className="absolute top-0 w-1/3 h-full z-[12] animate-[mainpage-gun_infinite_14s]">
                <Image src="/assets/mainpage-gun.png" layout="fill" alt="gun" />
              </div>
              <div className="w-full h-full border-t-2 border-b-2 border-white flex justify-center items-center relative z-[11]">
                <div
                  className={`w-full flex justify-center px-48 2xl:px-40 py-8 2x:py-4 items-center h-full transition-all delay-100 duration-1000 ${
                    logoLoaded ? 'opacity-100' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  <Image
                    src="/assets/mainpage-logo.png"
                    alt="mainpage-logo"
                    width={1428}
                    height={267}
                    priority
                    onLoad={handleLogoLoaded}
                  />
                </div>
              </div>
              <span className="text-white text-sm tracking-wider font-normal">
                Convinced myself, I seek not to convince.
              </span>
            </div>
            <div className="w-full grow">
              <MainpageInterface
                roomList={roomList}
                searchButtonHandler={handleSearchButton}
              />
            </div>
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

      <div className="fixed top-0 left-0 z-[99999] bg-black text-white justify-center items-center w-screen h-screen overflow-hidden flex md:hidden">
        <div className="flex flex-col w-1/2 h-full items-center justify-center pb-52">
          <img src="/assets/mainpage-logo.webp" alt="logo" />
          <h1 className="font-bold pt-4">모바일 환경에서는</h1>
          <h1 className="font-bold whitespace-nowrap">
            플레이 하실 수 없습니다.
          </h1>
        </div>

        <div className="w-[1920px] h-8 absolute bottom-[38%] left-[50%] -translate-x-[53%] rotate-[15deg]">
          <img src="assets/crime-scene.png" alt="l" className="w-full h-full" />
        </div>
        <div className="w-[1920px] h-8 absolute bottom-[38%] left-[50%] -translate-x-[53%] -rotate-[15deg]">
          <img src="assets/crime-scene.png" alt="l" className="w-full h-full" />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const userAgent = req.headers['user-agent'];
  const md = new MobileDetect(userAgent || '');
  const isChrome = getBrowser(userAgent || '') === 'chrome';

  if (userAgent && md.phone() !== null) {
    return {
      redirect: {
        destination: '/mobilewarning',
        permanent: false,
      },
    };
  }
  if (userAgent && !isChrome) {
    return {
      props: {},
      redirect: {
        destination: '/chromewarning',
        permanent: false,
      },
    };
  }

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
