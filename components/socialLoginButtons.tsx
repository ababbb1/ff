import { signIn } from 'next-auth/react';
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
      <div className="flex items-center">
        <a
          onClick={() => handleLogin('kakao')}
          className="flex items-center hover:cursor-pointer"
        >
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 relative hover:w-10 hover:h-10 hover:2xl:w-12 hover:2xl:h-12 mt-6 hover:mt-4 mr-3 hover:mr-1 hover:-translate-x-1 hover:translate-y-1">
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
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 relative hover:w-10 hover:h-10 hover:2xl:w-12 hover:2xl:h-12 mt-6 hover:mt-4 mr-3 hover:mr-1 hover:-translate-x-1 hover:translate-y-1">
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
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 relative hover:w-10 hover:h-10 hover:2xl:w-12 hover:2xl:h-12 mt-6 hover:mt-4 mr-3 hover:mr-1 hover:-translate-x-1 hover:translate-y-1">
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
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 relative hover:w-10 hover:h-10 hover:2xl:w-12 hover:2xl:h-12 mt-6 hover:mt-4 mr-3 hover:mr-1 hover:-translate-x-1 hover:translate-y-1">
            <img
              src="/social/facebook.webp"
              alt="facebook"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </a>
      </div>
      {isLoading && <LoadingScreen fullScreen />}
    </>
  );
}
