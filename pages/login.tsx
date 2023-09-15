import Head from 'next/head';
import Image from 'next/image';
import logo from '@/public/img/logo.svg';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';

interface Inputs {
	email: string;
	password: string;
}

function Login() {
	const { signIn, signUp } = useAuth();
	const [Login, setLogin] = useState<boolean>(false);
	const {
		register, // 원하는 input요소에 전개연산자로 등록해서 값 관리
		handleSubmit, // submit 이벤트 발생시 register에 등록된 input값들의 인증처리 함수, 인증완료시 처리할 추가작업의 함수를 콜백으로 등록가능
		formState: { errors }, // 인증 실패시 커스텀 에러 메세지를 등록할 수 있는 객체
	} = useForm<Inputs>();

	// handleSubmit 함수가 인증처리 완료시 동기적으로 실행될 콜백함수 등록
	// 해당 콜백함수는 인증에 성공했을 때 호출: 인수로 전달되는 값은 관리되고 있는 form의 value값
	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (Login) {
			// Sign In 버튼 클릭시 실행
			// 전역 context에서 로그인 함수를 호출하여 실행
			await signIn(email, password);
		} else {
			// Sign Up 버튼 클릭시 실행
			// 전역 context에서 회원가입 함수를 호출하여 실행
			await signUp(email, password);
		}
	};

	return (
		<main className='relative flex w-full h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* 이미지를 full screen으로 사용하는 경우 사이즈 지정 안하는것을 추천 */}
			<Image
				src='https://rb.gy/p2hphi'
				fill
				priority
				className='z-[-1] opacity-60 hidden md:inline object-cover'
				alt='login'
			/>

			<Image
				src={logo}
				alt='logo'
				className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6'
				width={150}
				height={150}
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>

			<form
				className='relative mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
				onSubmit={handleSubmit(join)} // submit 이벤트 발생시 handleSubmit이 인증처리를 해주고 인증의 결과값을 등록된 콜백함수에 전달
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>

				<div className='space-y-4'>
					<input
						type='email'
						placeholder='Email'
						className='input'
						{...register('email', { required: true, minLength: 7, maxLength: 20 })}
					/>
					{errors.email && <span>Please enter a valid Email.</span>}

					<input
						type='password'
						placeholder='Password'
						className='input'
						{...register('password', {
							required: true,
							pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&])(?=.*[0-9]).{5,20}$/,
						})}
					/>
					{errors.password && <span>Please enter a valid Password.</span>}
				</div>

				<button className='w-full rounded bg-[#e40914] py-3 font-semibold' onClick={() => setLogin(true)}>
					Sign In
				</button>

				<div className='text-[gray]'>
					New to NEXTFLIX?
					<button className='text-white ml-4 hover:underline' onClick={() => setLogin(false)}>
						Sign Up Now
					</button>
				</div>
			</form>
		</main>
	);
}

export default Login;
