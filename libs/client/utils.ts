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

export const splitByColon = (s: string, t: 'name' | 'platform') =>
  s.includes(':') ? (t === 'name' ? s.split(':')[0] : s.split(':')[1]) : s;

export const getImageUrl = (id: string) =>
  `https://imagedelivery.net/-T83tAhVmWAdtnO8EXNRag/${id}/public`;
