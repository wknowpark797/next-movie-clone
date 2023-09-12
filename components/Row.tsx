import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
	title: string;
	movies: Movie[];
}

function Row({ title, movies }: Props) {
	const [Movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		setMovies(movies);
	}, [movies]);

	return (
		<article className='space-y-0.5 z-20 md:space-y-2 pl-4 md:pb-[30px] md:pl-12'>
			<h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
				{title}
			</h2>

			<div className='relative'>
				<ul className='w-full flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-track-[transparent] scrollbar-thumb-red-600 scrollbar-none hover:scrollbar-thin scrollbar'>
					{Movies.map((movie, idx) => {
						return (
							<li key={idx} className='min-w-[180px] h-[80px] relative'>
								<Image
									src={`${baseURL}w300${movie.backdrop_path}`}
									alt={`${movie.title || movie.name}`}
									fill
									priority
									className='object-cover'
									quality={70}
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
