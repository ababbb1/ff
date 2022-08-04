import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import API from '../../../libs/api';
import jwt_decode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    secret: process.env.SECRET,
    providers: [
      CredentialsProvider({
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
        },
        name: 'Credentials',
        authorize: async credentials => {
          const res = await API.post('local/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

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
            userId: user.sub || token.id,
            token: user.token,
            nickname: user.nickname || user.name,
            social: user.social,
            provider: account.provider,
          };
        else return token;
      },

      // eslint-disable-next-line
      // @ts-ignore:next-line
      async session({ session, token }) {
        if (token) {
          if (token.provider !== 'credentials') {
            const data = {
              email: `${token.email}:${token.provider}`,
              nickname: `${token.nickname}:${token.provider}`,
            };
            const res = await API.post('login', data);

            const _token = res.data.result.token;
            const user: Session = jwt_decode(_token);

            return {
              ...session,
              ...token,
              token: _token,
              userId: user.id,
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
      // error: '/error/login-error',
    },
  });
}
