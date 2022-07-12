import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import LoadingScreen from './loading-screen';
import { Provider } from '../libs/types/user';

export default function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = (name: Provider) => {
    setIsLoading(true);
    signIn(name, { callbackUrl: '/' });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <a
          onClick={() => loginHandler('kakao')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/kakao.png"
              alt="kakao"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
        <a
          onClick={() => loginHandler('naver')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/naver.png"
              alt="naver"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
        <a
          onClick={() => loginHandler('google')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/google.png"
              alt="google"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
        <a
          onClick={() => loginHandler('facebook')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/facebook.png"
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
