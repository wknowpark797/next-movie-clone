import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';

interface Props {
	movies: Movie[];
}

function List({ movies }: Props) {
	return (
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
	);
}

export default List;
