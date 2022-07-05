export type Provider =
  | 'credentials'
  | 'kakao'
  | 'naver'
  | 'google'
  | 'facebook';

export interface UserSession {
  email: string;
  exp: number;
  expires: string;
  iat: number;
  jti: string;
  nickname: string;
  provider: Provider;
  social: boolean;
  token: string;
}
