import Head from 'next/head';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
}

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title || 'WHO ARE YOU'}</title>
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-screen h-screen flex justify-center items-center text-[#222]">
        <main className="w-full h-full max-w-[1920px] max-h-[1080px]">
          {children}
        </main>
      </div>
    </>
  );
}
