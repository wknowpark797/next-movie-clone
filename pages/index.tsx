import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main>
				<h1>NEXTFLIX</h1>
			</main>
		</div>
	);
};

export default Home;
