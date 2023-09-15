import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { auth } from '@/firebase';

interface ILoading {
	current: boolean | null;
}

// 전역 context에 전달되는 객체 인터페이스
interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	InitialLoading: ILoading;
}

// AuthProvider로 감싸지는 children props의 인터페이스
interface AuthProviderProps {
	children: React.ReactNode;
}

// 전역 context의 초기값 (IAuth 타입 지정)
const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signIn: async () => {},
	signUp: async () => {},
	logout: async () => {},
	// InitialLoading 값을 전역 context에 추가
	InitialLoading: { current: true },
});

// AuthProvider로 전체 페이지 컴포넌트를 감싸주기 때문에 자식 타입을 리액트 노드로 지정
export const AuthProvider = ({ children }: AuthProviderProps) => {
	// InitialLoading 초기값 설정(true)
	// 추후 firebase를 통해 user 정보값이 받아지면 false로 변경
	// 해당 값을 state가 아닌 useRef로 담는 이유는 해당값이 변경되자마자 렌더링사이클에서 바로 변경점을 적용하기 위함
	const InitialLoading = useRef<boolean>(true);
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const router = useRouter();

	/*
		[ 라우터 이동에 대한 에러 이슈 ]
		라우터 이동시 라우터의 빠른 이동속도 때문에 abort fetch router 에러 발생
		
		[ 원인 ]
		데이터가 fetching 중이거나 컴포넌트의 추가적인 데이터들이 full loaded되지 않은 상태에서 라우터가 변경될 때

		[ 해결방법 ]
		1. router.push('/', undefined, {shallow: true})
		-> 라우터 이동시 fetching 기능을 무시하고 라우터 이동만 처리 (실제 컴포넌트 변경시)
		
		2. 커스텀 훅을 생성하고 그 안쪽에서 router.onChangeComplete 이벤트를 활용해서 기존 라우터 변경이 끝난 이후에 router.push 호출 (다른 훅이나 핸들러 함수 안쪽에서 호출 불가능)

		현재 상황에서 위의 두가지 해결방법 모두 적용 불가능
		-> 전체 컴포넌트를 감싸고 있는 root 컴포넌트이기 때문에 unmount가 불가능하기 때문

		[ 해결방법 결론 ]
		3. useAuth 훅 안에서 유저 정보값이 변경될때마다 setTimeout으로 강제 debouncing 적용
	*/
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			// 인증상태를 감지
			if (user) {
				// 전달받은 인증 정보가 있을 경우
				setUserInfo(user);
				router.push('/');
			} else {
				// 전달받은 인증 정보가 없을 경우
				setUserInfo(null);

				// 메인 페이지에서 로그인 페이지로 넘어갈 때 0.3초동안 push가 중복실행되지 않도록 debouncing 적용
				setTimeout(() => {
					router.push('/login');
				}, 300);
			}

			// 한번이라도 인증로직이 실행되면 초기상태(false) 처리
			// user 정보값이 받아지고 동기적으로 값을 false로 변경하기 위해서 setTimeout을 이용해 강제로 wep api에 전달한 후 받음(동기화) -> promise로 처리 가능
			setTimeout(() => {
				InitialLoading.current = false;
			}, 0);
		});
	}, []);

	// 회원가입 함수
	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
			})
			.catch((err) => alert(err.message));
	};

	// 로그인 함수
	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
			})
			.catch((err) => alert(err.message));
	};

	// 로그아웃 함수
	const logout = async () => {
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch((err) => alert(err.message));
	};

	// useMemo를 이용하여 UserInfo, Loading값이 바뀔때만 각 함수 및 정보를 객체로 묶어서 메모이제이션 처리된 리턴값을 전역 컴포넌트에 전달
	// 새로고침시 같은 로그인 정보값일 경우 해당 값을 다시 연산하지 않도록 메모이제이션 처리를 하여 전역 context에 전달
	const memoedContext = useMemo(
		() => ({ UserInfo, signIn, signUp, logout, InitialLoading }),
		[UserInfo, InitialLoading]
	);
	// 로그인 정보값이 있을 경우에만 화면 출력
	// 실시간으로 적용되는 InitialLoading 값을 전역 context에 담는다.
	return <AuthContext.Provider value={memoedContext}>{children}</AuthContext.Provider>;
};

// 전역 context에 접근하기 위한 커스텀 훅
export default function useAuth() {
	return useContext(AuthContext);
}
