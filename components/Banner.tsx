import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useRef } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';

interface Props {
	original: Movie;
}

function Banner({ original }: Props) {
	const { InitialLoading } = useAuth();
	const loading = useRef<HTMLDivElement>(null);

	return (
		<section className='px-4 pb-24 pt-40  flex flex-col space-y-4 py-16 h-[50vh] md:space-y-8 md:h-[60vh] lg:space-y-12 lg:px-16 lg:h-[95vh] lg:justify-end lg:pb-40 overflow-hidden relative'>
			{InitialLoading.current ? (
				<div className='loading'></div>
			) : (
				<>
					{/* 이미지 Frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full'>
						<Image
							src={`${baseURL}original${original.backdrop_path}`}
							alt={`${original.title || original.name}`}
							fill
							priority
							className='object-cover'
							quality={70}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							onLoadingComplete={() => loading.current?.remove()}
						/>
						<div className='absolute bottom-0 left-0 w-full h-full bg-gradient1'></div>

						{/* Loading */}
						<div ref={loading} className='loading'></div>
					</div>

					{/* 이미지 정보 */}
					<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>
						{original.title || original.name}
					</h1>
					<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
						{original.overview}
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
