import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import SocialLoginButtons from '../components/social-login-buttons';
import { cls, emailCheck } from '../libs/client/utils';
import ErrorMessage from '../components/errorMessage';
import Link from 'next/link';

export interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const onValid: SubmitHandler<LoginForm> = (data: LoginForm) => {
    signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full justify-center items-center h-screen flex">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col items-center h-screen gap-4 px-4 pt-24 w-full max-w-sm"
      >
        <div className="w-full flex flex-col gap-1">
          <input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              validate: { emailCheck: emailCheck },
            })}
            placeholder="이메일"
            type="text"
            className={`${cls(
              'w-full h-12 border rounded-md p-2',
              errors.email
                ? 'border-red-400 focus:outline-red-400'
                : 'border-gray-300 focus:outline-gray-500',
            )}`}
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
            className={`${cls(
              'w-full h-12 border rounded-md p-2',
              errors.password
                ? 'border-red-400 focus:outline-red-400'
                : 'border-gray-300 focus:outline-gray-500',
            )}`}
          />
          <ErrorMessage message={errors.password?.message} />
        </div>

        <div className="mt-6 flex flex-col gap-2 w-full">
          <button type="submit">로그인</button>
          <Link href="/join">
            <button>회원가입</button>
          </Link>
        </div>
        <SocialLoginButtons />
      </form>
    </div>
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

  console.log(session);

  return {
    props: {
      session,
    },
  };
};
