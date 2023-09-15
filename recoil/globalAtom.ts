// npm install recoil
import { atom } from 'recoil'; // 전역 객체 생성
import { Movie } from '@/types';

export const modalState = atom<boolean>({
	/*
		[ recoil key값에 대한 에러 이슈 ]
		atom 객체의 key값이 고유값으로 인지되어야 하지만 next에서는 pre-render가 미리 실행되기 때문에
		서버에서 한번, hydrate때 한번 실행 (Next에서만 발생하는 문제점)
		
		[ 해결방법 ]
		컴포넌트가 구동될 때마다 고유값을 추가로 뒤에 붙여 key값 중복오류를 해결
	*/
	key: `modalState${performance.now()}`,
	default: false,
});

export const movieState = atom<Movie | null>({
	key: `movieState${performance.now()}`,
	default: null,
});
