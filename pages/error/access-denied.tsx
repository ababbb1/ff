import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AccessDenied() {
  const router = useRouter();
  useEffect(() => {
    alert('잘못된 접근입니다.');
    router.replace('/');
  }, []);
  return null;
}
