import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

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
		<section className='px-4 pb-24 pt-40  flex flex-col space-y-4 py-16 md:space-y-8 lg:space-y-12 lg:px-16 lg:h-[95vh] lg:justify-end lg:pb-40 overflow-hidden relative'>
			{Movie && (
				<>
					{/* 이미지 Frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full'>
						<Image
							src={`${baseURL}original${Movie.backdrop_path}`}
							alt={`${Movie.title || Movie.name}`}
							fill
							priority
							className='object-cover'
							quality={70}
						/>
						<div className='absolute bottom-0 left-0 w-full h-full bg-gradient1'></div>
					</div>

					{/* 이미지 정보 */}
					<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>
						{Movie.title || Movie.name}
					</h1>
					<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
						{Movie.overview}
					</p>

					{/* 버튼 Set */}
					<nav className='relative z-[3] flex space-x-3'>
						<button className='btn-banner bg-white text-black'>
							<FaPlay /> Play
						</button>
						<button className='btn-banner bg-[gray] text-white'>
							<FaInfoCircle /> More Info
						</button>
					</nav>
				</>
			)}
		</section>
	);
}

export default Banner;
