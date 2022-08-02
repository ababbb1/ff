import { EpisodeInfo, RoleInfo } from './types/game';

export const ROOM_USER_COUNT_LIMIT = 2;
export const EPISODES: EpisodeInfo[] = [
  {
    title: '대저택 살인사건',
    description:
      '새벽 서울 외곽에 위치한 호화 대저택의 욕실에서 날카로운 비명이 울려 퍼진다. 욕조 안에 쓰러진 모습으로 간병인에 의해 발견된 피해자는 대저택의 주인이자 추리소설계의 거장으로 불리는 장세민 작가. 사체 발견 당시, 특별한 외상은 보이지 않았는데... 사건 현장을 둘러본 탐정은 사망 추정 시각, 대저택에 머물고 있던 5명의 용의자를 소환한다. 유언장 공표를 하루 앞둔 채 싸늘한 주검으로 발견된 장세민! 과연 그를 죽음에 이르게 한 범인은 누구인가?',
  },
  { title: 'Random', description: '' },
];

export const IMAGE_SIZE_HORIZONTAL = [520, 400];
export const IMAGE_SIZE_VERTICAL = [400, 520];

export const ROLES: RoleInfo[] = [
  {
    id: 6,
    name: '장세민',
    kind: '피해자',
    gender: '남성',
    age: 70,
    job: '추리소설 작가',
    imageSrc: '/assets/jang.png',
    description: '',
  },
  {
    id: 1,
    name: '장아들',
    kind: '용의자1',
    gender: '남성',
    age: 21,
    job: '무직',
    imageSrc: '/assets/son.png',
    description: '장세민의 친아들',
  },
  {
    id: 2,
    name: '정손녀',
    kind: '용의자2',
    gender: '여성',
    age: 20,
    job: '금수저',
    imageSrc: '/assets/jung.png',
    description: '장세민의 외손녀',
  },

  {
    id: 3,
    name: '박케어',
    kind: '용의자3',
    gender: '여성',
    age: 41,
    job: '전문 간병인',
    imageSrc: '/assets/park.png',
    description: '장세민의 간병인',
  },
  {
    id: 4,
    name: '홍변호',
    kind: '용의자4',
    gender: '남성',
    age: 40,
    job: '변호사',
    imageSrc: '/assets/hong.png',
    description: '장세민의 변호사',
  },
  {
    id: 5,
    name: '양손님',
    kind: '용의자5',
    gender: '남성',
    age: 45,
    job: '손님',
    imageSrc: '/assets/yang.png',
    description: '장세민의 손님',
  },
];
