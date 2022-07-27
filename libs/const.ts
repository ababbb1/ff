import { EpisodeInfo } from './types/room';

export const ROOM_USER_COUNT_LIMIT = 2;
export const EPISODES: EpisodeInfo[] = [
  {
    title: '대저택 살인사건',
    description:
      '새벽 서울 외곽에 위치한 호화 대저택의 욕실에서 날카로운 비명이 울려 퍼진다. 욕조 안에 쓰러진 모습으로 간병인에 의해 발견된 피해자는 대저택의 주인이자 추리소설계의 거장으로 불리는 장세민 작가. 사체 발견 당시, 특별한 외상은 보이지 않았는데... 사건 현장을 둘러본 탐정은 사망 추정 시각, 대저택에 머물고 있던 5명의 용의자를 소환한다. 유언장 공표를 하루 앞둔 채 싸늘한 주검으로 발견된 장세민! 과연 그를 죽음에 이르게 한 범인은 누구인가?',
  },
  { title: 'Random', description: '' },
];
export const ROLES = ['장아들', '정손녀', '박케어', '홍변호', '양손님'];
