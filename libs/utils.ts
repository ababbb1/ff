import { Section } from '../components/room/hint/room-hint';

export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export const emailCheck = (value: string) => {
  // eslint-disable-next-line
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(value) || '이메일 형식이 올바르지 않습니다.';
};

export const nicknameCheck = (value: string) => {
  console.log(value.length);
  // eslint-disable-next-line
  const regExp = /[^\w가-힣0-9]|[\_]/g;
  return !regExp.test(value) || '특수문자는 사용할 수 없습니다.';
};

export const roomPasswordCheck = (value: string) => {
  // eslint-disable-next-line
  const regExp = /[^\0-9]|[\_]/g;
  return !regExp.test(value) || '숫자만 입력해주세요.';
};

export const imagedataToImageUrl = (imagedata?: ImageData) => {
  if (!imagedata) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx?.putImageData(imagedata, 0, 0);

  return canvas.toDataURL();
};

export const base64ToFile = (dataurl: string, fileName: string) => {
  const arr = dataurl.split(','),
    regExpMatchArray = arr[0].match(/:(.*?);/),
    mime = regExpMatchArray ? regExpMatchArray[1] : undefined,
    bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

export const splitByColon = (s: string, t: 'name' | 'platform') => {
  if (!s) return;
  return s.includes(':')
    ? t === 'name'
      ? s.split(':')[0]
      : s.split(':')[1]
    : s;
};

export const getImageUrl = (id: string) =>
  `https://imagedelivery.net/-T83tAhVmWAdtnO8EXNRag/${id}/public`;

export const getItemsFromDateObject = (_date: Date) => {
  const today = new Date();
  const _year = _date.getFullYear();
  const _hours = _date.getHours();
  const _minutes = _date.getMinutes();
  const concat0 = (i: number): string => (i < 10 ? `0${i}` : i.toString());
  const notThisYear = today.getFullYear() !== _year ? _year : '';
  const notThisYearKor = notThisYear ? `${notThisYear}년` : '';
  const ampm =
    _hours > 12
      ? `PM ${concat0(_hours - 12)}:${concat0(_minutes)}`
      : `AM ${concat0(_hours)}:${concat0(_minutes)}`;
  const ampmKor =
    _hours > 12
      ? `오후 ${concat0(_hours - 12)}:${concat0(_minutes)}`
      : `오전 ${concat0(_hours)}:${concat0(_minutes)}`;

  return {
    year: _year,
    month: _date.getMonth() + 1,
    date: _date.getDate(),
    hours: _hours,
    minutes: _minutes,
    seconds: _date.getSeconds(),
    ampm,
    ampmKor,
    notThisYear,
    notThisYearKor,
  };
};

export const getSectionTitle = (section: Section) => {
  switch (section.name) {
    case 'map':
      return '전체지도';
    case 'jangroom':
      return '1F 장세민 침실';
    case 'bathroom':
      return '욕실';
    case 'library':
      return '1F 장세민 서재';
    case 'livingroom':
      return '1F 대저택 거실';
    case 'parkroom':
      return '1F 박케어 방';
    case 'yangroom':
      return '2F 양손님 객실';
    case 'sonroom':
      return '2F 장아들 방';
    case 'jungroom':
      return '2F 정손녀 방';
    case 'hongroom':
      return '별채 홍변호 방';
  }
};
