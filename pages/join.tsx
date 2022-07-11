import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joinRequest } from '../libs/client/api';
import { useRouter } from 'next/router';
import ErrorMessage from '../components/error-message';
import { cls, emailCheck } from '../libs/client/utils';
import Layout from '../components/layout';

export interface JoinFormData {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

export default function Join() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({ mode: 'onBlur' });

  const onValid: SubmitHandler<JoinFormData> = (data: JoinFormData) => {
    joinRequest({ data }).then(() => {
      alert('회원가입에 성공했습니다.');
      router.replace('/login');
    });
  };

  return (
    <Layout>
      <div className="w-full justify-center items-center h-screen flex">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col items-center h-screen gap-5 px-4 pt-16 w-full max-w-sm"
        >
          <div className="w-full">
            <input
              {...register('email', {
                required: '이메일을 입력해주세요.',
                validate: { emailCheck },
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

          <div className="flex flex-col gap-2 w-full">
            <input
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
              })}
              placeholder="닉네임"
              type="text"
              className={`${cls(
                'w-full h-12 border rounded-md p-2',
                errors.nickname
                  ? 'border-red-400 focus:outline-red-400'
                  : 'border-gray-300 focus:outline-gray-500',
              )}`}
            />
            <ErrorMessage message={errors.nickname?.message} />
          </div>

          <div className="flex flex-col gap-2 w-full">
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

            <input
              {...register('passwordCheck', {
                required: '비밀번호가 일치하지 않습니다.',
              })}
              placeholder="비밀번호 재입력"
              type="password"
              className={`${cls(
                'w-full h-12 border rounded-md p-2',
                errors.passwordCheck
                  ? 'border-red-400 focus:outline-red-400'
                  : 'border-gray-300 focus:outline-gray-500',
              )}`}
            />
            <ErrorMessage message={errors.passwordCheck?.message} />
          </div>

          <div className="mt-6 flex flex-col gap-2 w-full">
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
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
