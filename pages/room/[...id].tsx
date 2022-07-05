import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ModalLayout from '../../components/modalLayout';
import { useEffect, useState } from 'react';
import RoomHint from '../../components/roomHint';
import RoomReasoning from '../../components/roomReasoning';

export default function Room() {
  const router = useRouter();
  const [isSetting, setIsSetting] = useState<boolean>(false);

  if (router.query.id?.includes('hint')) return <RoomHint />;
  if (router.query.id?.includes('reasoning')) return <RoomReasoning />;

  return (
    <div>
      <button
        onClick={() => {
          setIsSetting(true);
        }}
      >
        세팅
      </button>
      <button
        onClick={() => {
          router.replace(
            `/room/${router.query.id}/?hint=1`,
            `/room/${router.query.id}/hint`,
            {
              shallow: true,
            },
          );
        }}
      >
        게임시작
      </button>

      {isSetting && (
        <ModalLayout
          background="dark"
          onClose={() => {
            setIsSetting(false);
          }}
        >
          <div className="bg-white w-[50rem] h-[40rem]">setting</div>
        </ModalLayout>
      )}
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

  if (!req.headers.referer) {
    return {
      redirect: {
        destination: '/error/access_denied',
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
