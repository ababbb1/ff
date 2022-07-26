import { Session } from 'next-auth';

export type Provider =
  | 'credentials'
  | 'kakao'
  | 'naver'
  | 'google'
  | 'facebook';

export declare interface UserSession extends Session {
  id: number;
  email: string;
  exp: number;
  expires: string;
  iat: number;
  jti: string;
  nickname: string;
  provider: Provider;
  token: string;
}
