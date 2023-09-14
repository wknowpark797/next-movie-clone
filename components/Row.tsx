import { Movie } from '@/types';
import List from './List';

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
		<article className='space-y-0.5 z-20 md:space-y-2 pl-4 md:pb-[30px] lg:pl-12'>
			<h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
				{title}
			</h2>

			{/* 부모요소에 group으로 지정 후 자식요소에서 group-hover라고 설정: hover 타겟 대상이 자식이 아닌 부모요소로 그룹화 가능 */}
			<div className='relative group'>
				<List movies={movies} />
			</div>
		</article>
	);
}

export default Row;
