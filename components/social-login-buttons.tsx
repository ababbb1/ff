import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import LoadingScreen from './loadingScreen';
import kakao from '../public/kakao.png';
import naver from '../public/naver.png';
import google from '../public/google.png';
import facebook from '../public/facebook.png';

type OAuthName = 'kakao' | 'naver' | 'google' | 'facebook';

export default function SocialLoginButtons() {
  const [loadingScreenState, setLoadingScreenState] = useState(false);

  const loginHandler = (name: OAuthName) => {
    setLoadingScreenState(true);
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
              src={kakao}
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
              src={naver}
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
              src={google}
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
              src={facebook}
              alt="facebook"
              layout="fill"
              quality={100}
              priority
            />
          </div>
        </a>
      </div>
      <LoadingScreen visible={loadingScreenState} />
    </>
  );
}
