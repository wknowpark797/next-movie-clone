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
		<article className='space-y-0.5 z-20 md:space-y-2 md:pb-[30px]'>
			<h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
				{title}
			</h2>

			<div>
				<ul>
					{Movies.map((movie, idx) => {
						return (
							<li key={idx} className='w-[200px] h-[130px] relative'>
								<Image
									src={`${baseURL}${movie.backdrop_path}`}
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
