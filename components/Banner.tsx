import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	return (
		<section className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
			<div className='absolute top-0 left-0 z-[1] h-[95vh] w-full'>
				<Image
					src={`${baseURL}${Movie?.backdrop_path}`}
					alt={`${Movie?.title || Movie?.name}`}
					fill
					priority
					className='object-cover'
					quality={50}
				/>
			</div>
		</section>
	);
}

export default Banner;
