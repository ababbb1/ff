export interface EpisodeInfo {
  title: string;
  description: string;
}

export type RoleNames =
  | '장세민'
  | '장아들'
  | '정손녀'
  | '박케어'
  | '홍변호'
  | '양손님';

export interface RoleInfo {
  name: RoleNames;
  kind: string;
  imageSrc: string;
  gender: '남성' | '여성';
  age: number;
  job: string;
}

export interface HintInfoContentItem {
  title: string;
  roleInfo: RoleInfo;
  description: JSX.Element;
  index: number;
  prevButtonHandler: (() => void) | null;
  nextButtonHandler: (() => void) | null;
}
