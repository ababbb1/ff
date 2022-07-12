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
            <Image
              src="/social/kakao.png"
              alt="kakao"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
        <a
          onClick={() => handleLogin('naver')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/social/naver.png"
              alt="naver"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
        <a
          onClick={() => handleLogin('google')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/social/google.png"
              alt="google"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
        <a
          onClick={() => handleLogin('facebook')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/social/facebook.png"
              alt="facebook"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
      </div>
      {isLoading && <LoadingScreen />}
    </>
  );
}
