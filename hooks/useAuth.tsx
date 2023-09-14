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
	const [Loading, setLoading] = useState<boolean>(false);
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const [Errors, setErrors] = useState<string | null>(null);

	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			// 인증상태를 감지
			if (user) {
				// 전달받은 인증 정보가 있을 경우
				setUserInfo(user);
				setLoading(false);
				router.push('/');
			} else {
				// 전달받은 인증 정보가 없을 경우
				setUserInfo(null);
				setLoading(true);
				router.push('/login');
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
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
				router.push('/');
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	// 로그인 함수
	const signIn = async (email: string, password: string) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
				router.push('/');
				setLoading(false);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	// 로그아웃 함수
	const logout = async () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
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
