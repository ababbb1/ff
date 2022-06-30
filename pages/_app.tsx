import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType, NextPageContext } from 'next';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

App.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: NextComponentType;
  ctx: NextPageContext;
}) => {
  // const protocol = ctx.req?.headers.referer?.split('://')[0];
  // const hostname = ctx.req?.headers.host;

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
