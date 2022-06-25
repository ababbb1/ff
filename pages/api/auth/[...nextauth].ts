import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    KakaoProvider({
      name: 'kakao',
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
});
