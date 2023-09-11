/*
  [ *.ts vs *.d.ts ]
  - .ts는 js파일로 컴파일된다.
  - .d.ts는 develope mode에서만 구동되고 일반 js파일로 컴파일 되지 않는다.
  - js로 컴파일되지 않으면 빌드시에도 포함되지 않기 때문에 불필요한 파일의 용량을 줄일 수 있다.
*/

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
