import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    userId: number;
    email: string;
    exp: number;
    expires: string;
    iat: number;
    jti: string;
    nickname: string;
    provider: Provider;
    token: string;
  }
}
