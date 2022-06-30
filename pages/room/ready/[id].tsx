import { useRouter } from 'next/router';
import ModalLayout from '../../../components/modalLayout';
import { useState } from 'react';

export default function Room() {
  const router = useRouter();
  const [isSetting, setIsSetting] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsSetting(true);
        }}
      >
        세팅
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
