import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useRef } from 'react';

interface Props {
	movies: Movie[];
}

function List({ movies }: Props) {
	const listFrame = useRef<HTMLUListElement>(null);

	// 좌우버튼 클릭시 인수로 들어오는 방향에 따라 가로축으로 이동할 타겟 위치값을 구해서 scrollTo 이동처리
	const handleClick = (direction: string) => {
		if (listFrame.current) {
			const { scrollLeft, clientWidth } = listFrame.current;
			const targetPos = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
			listFrame.current.scrollTo({left: targetPos, behavior: 'smooth'});
		}
	};

	return (
		<>
			<ul
				ref={listFrame}
				className='w-full flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-thin scrollbar-track-[transparent] scrollbar-thumb-[transparent] group-hover:scrollbar-thumb-red-600'
			>
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

			{/* Arrow */}
			<FaAngleLeft
				className='absolute top-0 bottom-0 left-2 z-40 m-auto h-9 cursor-pointer opacity-0 group-hover:opacity-100'
				onClick={() => handleClick('left')}
			/>

			<FaAngleRight
				className='absolute top-0 bottom-0 right-2 z-40 m-auto h-9 cursor-pointer opacity-0 group-hover:opacity-100'
				onClick={() => handleClick('right')}
			/>
		</>
	);
}

export default List;
