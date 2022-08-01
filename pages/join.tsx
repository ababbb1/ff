import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import API from '../libs/api';
import { useRouter } from 'next/router';
import ErrorMessage from '../components/error-message';
import { emailCheck, nicknameCheck } from '../libs/utils';
import Layout from '../components/layout/layout';
import AnimatedTextLayout from '../components/layout/animated-text-layout';

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
    watch,
    formState: { errors },
  } = useForm<JoinFormData>({ mode: 'onChange' });

  const onValid: SubmitHandler<JoinFormData> = async (data: JoinFormData) => {
    API.post('signup', data)
      .then(() => {
        alert('회원가입에 성공했습니다.');
        router.replace('/login');
      })
      .catch(e => alert(e.response.data.error));
  };

  return (
    <Layout title="회원가입">
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
          <div className="absolute top-0 w-full h-full max-h-[20%] flex justify-center items-center border-b-2 border-white z-20">
            <span className="font-hanson-bold text-white text-3xl 2xl:text-4xl">
              Sign Up
            </span>
          </div>

          <div className="w-full h-full flex justify-center items-center z-20 absolute top-0 left-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex flex-col items-center justify-center h-fit gap-4 px-4 pt-16 w-full max-w-md relative"
            >
              <div className="w-full">
                <input
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    validate: { emailCheck },
                  })}
                  placeholder="이메일을 입력해주세요."
                  type="text"
                  className="w-full h-12 border rounded-sm px-4 py-2 border-gray-300 focus:outline-gray-500"
                  autoComplete="off"
                />
                <ErrorMessage message={errors.email?.message} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <input
                  {...register('nickname', {
                    required: '닉네임을 입력해주세요.',
                    validate: {
                      nicknameCheck,
                      length: s => s.length < 11 || '10자 이하로 입력해주세요.',
                    },
                  })}
                  placeholder="닉네임을 입력해주세요."
                  type="text"
                  className="w-full h-12 border rounded-sm px-4 py-2 border-gray-300 focus:outline-gray-500"
                  autoComplete="off"
                />
                <ErrorMessage message={errors.nickname?.message} />
              </div>

              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
                placeholder="비밀번호를 입력해주세요."
                type="password"
                className="w-full h-12 border rounded-sm px-4 py-2 border-gray-300 focus:outline-gray-500"
              />

              <div className="w-full">
                <input
                  {...register('passwordCheck', {
                    required: '비밀번호가 일치하지 않습니다.',
                    validate: (check: string) =>
                      watch('password') === check ||
                      '비밀번호가 일치하지 않습니다.',
                  })}
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  type="password"
                  className="w-full h-12 border rounded-sm px-4 py-2 border-gray-300 focus:outline-gray-500"
                />
                <ErrorMessage message={errors.passwordCheck?.message} />
              </div>

              <div className="mt-6 flex gap-4 w-full h-12">
                <div
                  onClick={() => router.back()}
                  className="w-1/2 flex justify-center items-center bg-white rounded-sm hover:cursor-pointer hover:bg-black hover:text-white"
                >
                  취소
                </div>
                <button
                  type="submit"
                  className="w-1/2 bg-black text-white rounded-sm border-2 border-white hover:bg-white hover:text-black hover:border-black"
                >
                  가입하기
                </button>
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
