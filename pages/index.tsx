import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';

const Home: NextPage = ({ sf }) => {
	console.log('props: ', sf);
	return (
		<div className='relative h-screen bg-gradient-to-b from-[#333] to-[#141414]'>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main></main>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const sf = await fetch(requests.sf).then((res) => res.json());

	return {
		props: { sf: sf.results },
	};
};
