import Head from 'next/head';
import Image from 'next/image';
import logo from '@/public/img/logo.svg';

function Login() {
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

			<form className='relative mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-dm md:px-14'>
				<h1 className='text-4xl font-semibold'>Sign In</h1>

				<div className='space-y-4'>
					<input type='email' placeholder='Email' className='input' />
					<input type='password' placeholder='Password' className='input' />
				</div>

				<button className='w-full rounded bg-[#e40914] py-3 font-semibold'>Sign In</button>

				<div className='text-[gray]'>
					New to NEXTFLIX?
					<button className='text-white ml-4 hover:underline'>Sign Up Now</button>
				</div>
			</form>
		</main>
	);
}

export default Login;
