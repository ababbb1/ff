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
  social: boolean;
  token: string;
}

export interface RoomData {
  count: number;
  hintTime: string;
  id: number;
  isRandom: string;
  master: string;
  password: string;
  reasoningTime: string;
  roomUniqueId: string;
  title: string;
}
