import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import axios from 'axios';
import { API_DOMAIN, contentTypeHeaders } from '../../../libs/client/api';
import jwt_decode from 'jwt-decode';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async credentials => {
      const res = await axios({
        method: 'post',
        url: `${API_DOMAIN}/api/local/login`,
        data: { email: credentials?.email, password: credentials?.password },
        headers: contentTypeHeaders,
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
];

const callbacks = {
  async jwt({ token, user, account }) {
    if (user) {
      if (account.provider !== 'credentials') {
        user.social = true;
      }
      return {
        ...token,
        token: user.token,
        nickname: user.nickname || user.name,
        social: user.social,
        provider: account.provider,
      };
    } else return token;
  },

  async session({ session, token }) {
    if (token) {
      if (token.provider !== 'credentials') {
        const res = await axios({
          method: 'post',
          url: `${API_DOMAIN}/api/login`,
          data: { email: token.email, nickname: token.nickname },
          headers: contentTypeHeaders,
        });
        return { ...session, ...token, token: res.data.token };
      }
      return { ...session, ...token };
    } else {
      return session;
    }
  },
};

const options = {
  secret: process.env.SECRET,
  providers,
  callbacks,
  pages: {
    error: '/login',
  },
};

const NextAuthHandler = (req, res) => NextAuth(req, res, options);
export default NextAuthHandler;
