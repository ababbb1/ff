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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="w-screen h-screen flex justify-center items-center text-[#222] max-w-[1920px] max-h-[1080px] fixed top-0 left-0">
        <main className="w-full h-full">{children}</main>
      </div>
    </>
  );
}
