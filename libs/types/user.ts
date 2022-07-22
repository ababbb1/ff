export type Provider =
  | 'credentials'
  | 'kakao'
  | 'naver'
  | 'google'
  | 'facebook';

export interface UserSession {
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
