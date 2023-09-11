import { Movie } from '@/types';
import { useState, useEffect } from 'react';

interface Props {
	original: Movie[];
}

function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {}, []);

	return <div></div>;
}

export default Banner;
