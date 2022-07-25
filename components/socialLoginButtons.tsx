import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import LoadingScreen from './loading-screen';
import { Provider } from '../libs/types/user';

export default function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (name: Provider) => {
    setIsLoading(true);
    signIn(name, { callbackUrl: '/' });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <a
          onClick={() => handleLogin('kakao')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <img
              src="/social/kakao.webp"
              alt="kakao"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </a>
        <a
          onClick={() => handleLogin('naver')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <img
              src="/social/naver.webp"
              alt="naver"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </a>
        <a
          onClick={() => handleLogin('google')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <img
              src="/social/google.webp"
              alt="google"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </a>
        <a
          onClick={() => handleLogin('facebook')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <img
              src="/social/facebook.webp"
              alt="facebook"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </a>
      </div>
      {isLoading && <LoadingScreen />}
    </>
  );
}
