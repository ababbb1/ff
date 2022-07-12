import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import API from '../../../libs/client/api';
import jwt_decode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserSession } from '../../../libs/types/user';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    secret: process.env.SECRET,
    providers: [
      CredentialsProvider({
        credentials: {},
        name: 'Credentials',
        authorize: async (credentials: Record<string, string> | undefined) => {
          const res = await API.post('local/login', credentials);

          const token = res.data.token;
          if (token) {
            return { ...jwt_decode(token), token };
          } else {
            return null;
          }
        },
      }),
      KakaoProvider({
        name: 'kakao',
        clientId: process.env.KAKAO_CLIENT_ID || '',
        clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      }),
      NaverProvider({
        name: 'naver',
        clientId: process.env.NAVER_CLIENT_ID || '',
        clientSecret: process.env.NAVER_CLIENT_SECRET || '',
      }),
      GoogleProvider({
        name: 'google',
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
      FacebookProvider({
        name: 'facebook',
        clientId: process.env.FACEBOOK_CLIENT_ID || '',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      }),
    ],
    callbacks: {
      async jwt({ token, user, account }) {
        if (user && account)
          return {
            ...token,
            id: user.sub,
            token: user.token,
            nickname: user.nickname || user.name,
            social: user.social,
            provider: account.provider,
          };
        else return token;
      },

      async session({ session, token }) {
        if (token) {
          if (token.provider !== 'credentials') {
            const data = {
              email: `${token.email}:${token.provider}`,
              nickname: `${token.nickname}:${token.provider}`,
            };
            const res = await API.post('login', data);

            const _token = res.data.result.token;
            const user: UserSession = jwt_decode(_token);

            return {
              ...session,
              ...token,
              token: _token,
              id: user.id,
              nickname: user.nickname,
              email: user.email,
            };
          }
          return { ...session, ...token };
        } else return session;
      },
    },
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/error/login-error',
    },
  });
}
