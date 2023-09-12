import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';

interface Props {
	title: string;
	movies: Movie[];
}

function Row({ title, movies }: Props) {
	title = title
		.split('_')
		.map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
		.join(' ');

	return (
		<article className='space-y-0.5 z-20 md:space-y-2 pl-4 md:pb-[30px] md:pl-12'>
			<h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
				{title}
			</h2>

			{/* 부모요소에 group으로 지정 후 자식요소에서 group-hover라고 설정: hover 타겟 대상이 자식이 아닌 부모요소로 그룹화 가능 */}
			<div className='relative group'>
				<ul className='w-full flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-thin scrollbar-track-[transparent] scrollbar-thumb-[transparent] group-hover:scrollbar-thumb-red-600'>
					{movies.map((movie, idx) => {
						return (
							<li key={idx} className='min-w-[180px] h-[80px] relative'>
								<Image
									src={`${baseURL}w300${movie.backdrop_path}`}
									alt={`${movie.title || movie.name}`}
									fill
									className='object-cover'
									quality={70}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									placeholder='blur'
									blurDataURL={`${baseURL}w300${movie.backdrop_path}`}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</article>
	);
}

export default Row;
