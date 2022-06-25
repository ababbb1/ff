import { signIn } from 'next-auth/react';

type OAuthName = 'kakao' | 'naver';

export default function Login() {
  const loginHandler = (name: OAuthName) => {
    signIn(name, { callbackUrl: '/' });
  };

  return (
    <div className="w-full justify-center items-center h-screen flex">
      <button
        onClick={() => loginHandler('kakao')}
        className="border border-black"
      >
        카카오 로그인
      </button>
      <button
        onClick={() => loginHandler('naver')}
        className="border border-black"
      >
        네이버 로그인
      </button>
    </div>
  );
}
