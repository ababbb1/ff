import { signIn } from 'next-auth/react';

type OAuthName = 'kakao' | 'naver' | 'google' | 'facebook';

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
      <button
        onClick={() => loginHandler('google')}
        className="border border-black"
      >
        구글 로그인
      </button>
      <button
        onClick={() => loginHandler('facebook')}
        className="border border-black"
      >
        페이스북 로그인
      </button>
    </div>
  );
}
