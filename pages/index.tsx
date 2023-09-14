import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';
import { Movie } from '@/types';
import Banner from '@/components/Banner';
import Row from '@/components/Row';
import Modal from '@/components/Modal';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/recoil/globalAtom';

interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	fantasy: Movie[];
	comedy: Movie[];
	action: Movie[];
	random: Movie;
}

// Next에서 기본으로 제공하는 NextPage 타입에는 커스텀 Props타입이 설정되어 있지 않기 때문에
// Generic을 활용해서 Props 타입의 인터페이스를 직접 변수로 호출할 때 설정한다.
const Home: NextPage<Props> = (props: Props) => {
	const showModal = useRecoilValue(modalState);

	// 1. 배열로 묶은 데이터를 useState로 담아서 재전달
	// 2. 배열로 묶은 데이터를 useRef 참조객체에 담아서 재전달
	// 3. 비구조화 할당이 아닌 객체를 통째로 받아서 전달해주고 활용하는 컴포넌트 내부에서 Object.key(), Object.value()로 내부에서 반복처리
	return (
		<div className='relative h-screen'>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='relative lg:space-y-24'>
				<Banner original={props.random} />

				<section>
					{Object.values(props)
						.filter((data) => data.length)
						.map((category, idx) => (
							<Row key={idx} movies={category} title={Object.keys(props)[idx]} />
						))}
				</section>
			</main>

			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	// Promise.all(): promise 반환함수를 배열에 인수로 넣어서 병렬식으로 해당 promise가 모두 fullfilled 상태가 되어야 해당 값을 동기적으로 반환
	const [original, top, sf, drama, fantasy, comedy, action] = await Promise.all([
		fetch(requests.original).then((res) => res.json()),
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.sf).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.fantasy).then((res) => res.json()),
		fetch(requests.comedy).then((res) => res.json()),
		fetch(requests.action).then((res) => res.json()),
	]);

	const randomOrigin = original.results[Math.floor(Math.random() * original.results.length)];

	return {
		props: {
			original: original.results,
			top_rated: top.results,
			sf: sf.results,
			drama: drama.results,
			fantasy: fantasy.results,
			comedy: comedy.results,
			action: action.results,
			random: randomOrigin,
		},
	};
};
