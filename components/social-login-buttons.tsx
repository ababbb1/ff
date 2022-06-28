import { signIn } from 'next-auth/react';
import Image from 'next/image';

type OAuthName = 'kakao' | 'naver' | 'google' | 'facebook';

export default function SocialLoginButtons() {
  const loginHandler = (name: OAuthName) => {
    signIn(name, { callbackUrl: '/' });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => loginHandler('kakao')}
        className="flex items-center hover:cursor-pointer"
      >
        <Image src={'/Kakao.png'} alt="kakao" width={40} height={40} />
      </button>
      <button
        onClick={() => loginHandler('naver')}
        className="flex items-center hover:cursor-pointer"
      >
        <div className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden rounded-full relative">
          <Image src={'/Naver.svg'} alt="naver" width={41} height={40} />
        </div>
      </button>
      <button
        onClick={() => loginHandler('google')}
        className="flex items-center hover:cursor-pointer"
      >
        <Image src={'/Google.svg'} alt="google" width={40} height={40} />
      </button>
      <button
        onClick={() => loginHandler('facebook')}
        className="flex items-center hover:cursor-pointer"
      >
        <Image src={'/Facebook.svg'} alt="facebook" width={40} height={40} />
      </button>
    </div>
  );
}
