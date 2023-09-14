// npm install recoil
import { atom } from 'recoil'; // 전역 객체 생성
import { Movie } from '@/types';

export const modalState = atom<boolean>({
	key: 'modalState',
	default: false,
});

export const movieState = atom<Movie | null>({
	key: 'movieState',
	default: null,
});
