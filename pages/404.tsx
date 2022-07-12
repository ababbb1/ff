import { GetStaticProps } from 'next';

export default function E404() {
  return null;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
