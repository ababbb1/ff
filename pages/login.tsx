import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SocialLoginButtons from '../components/socialLoginButtons';
import { emailCheck } from '../libs/utils';
import ErrorMessage from '../components/error-message';
import Link from 'next/link';
import Layout from '../components/layout/layout';
import AnimatedTextLayout from '../components/layout/animated-text-layout';

export interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onChange' });

  const onValid: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    // API.post('local/login', {
    //   email: data.email,
    //   password: data.password,
    // }).then(res => console.log(res.data));
    signIn('credentials', {
      callbackUrl: '/',
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Layout title="로그인">
      <AnimatedTextLayout>
        <div className="w-full h-full relative top-0 left-0 bg-white">
          <img
            src="/assets/note.webp"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              top: 0,
              left: 0,
              zIndex: 0,
              opacity: 0.2,
            }}
          />
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-b from-[#000000] via-[#000000db] to-[#00000056]"></div>

          <div className="w-full h-full flex justify-center items-center z-20 absolute top-0 left-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex flex-col items-center justify-center h-fit gap-4 px-4 pt-16 w-full max-w-md 2xl:max-w-xl relative"
            >
              <div className="w-full px-[4rem] 2xl:px-[5rem] mb-8 absolute -top-10 2xl:-top-20">
                <img src="assets/mainpage-logo.webp" alt="logo" />
              </div>

              <div className="w-full flex flex-col gap-1">
                <input
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    validate: { emailCheck: emailCheck },
                  })}
                  placeholder="이메일"
                  type="text"
                  className="w-full h-12 border rounded-sm px-4 py-2 border-gray-300 focus:outline-gray-500"
                  autoComplete="off"
                />
                <ErrorMessage message={errors.email?.message} />
              </div>

              <div className="w-full flex flex-col gap-1">
                <input
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                  placeholder="비밀번호"
                  type="password"
                  className="w-full h-12 border rounded-sm px-4 py-2 border-gray-300 focus:outline-gray-500"
                />
                <ErrorMessage message={errors.password?.message} />
              </div>

              <div className="mt-3 flex flex-col 2xl:gap-2 w-full">
                <button
                  type="submit"
                  className="w-full h-12 bg-white font-semibold rounded-sm hover:bg-black hover:text-white"
                >
                  로그인하기
                </button>

                <div className="flex justify-between items-center px-2">
                  <SocialLoginButtons />
                  <Link href="/join">
                    <span className="text-white 2xl:text-xl hover:cursor-pointer mt-8">
                      회원가입
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AnimatedTextLayout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
