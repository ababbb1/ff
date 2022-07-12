import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    alert('이메일 또는 비밀번호를 확인해주세요.');
    router.replace('/login');
  }, []);

  return null;
}
