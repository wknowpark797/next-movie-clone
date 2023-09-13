import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { auth } from '@/firebase';

// 전역으로 전달할 정보값
interface IAuth {
	User: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	Error: string | null;
	Loading: boolean;
}

// 전역 context의 초기값 (IAuth 타입 지정)
const AuthContext = createContext<IAuth>({
	User: null,
	signIn: async () => {},
	signUp: async () => {},
	logout: async () => {},
	Error: null,
	Loading: false,
});

// 전역 context를 루트 컴포넌트에 전달하기 위한 wrapping 컴포넌트
export const AuthProvider = ({ children }) => {
	const [Loading, setLoading] = useState<boolean>(false);
	const [User, setUser] = useState<User | null>(null);
	const [InitialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		// auth의 상태값이 바뀔때마다 useEffect 실행
		onAuthStateChanged(auth, (user) => {
			// 인증상태를 감지
			if (user) {
				// 전달받은 인증 정보가 있을 경우
				setUser(user);
				setLoading(false);
				router.push('/');
			} else {
				// 전달받은 인증 정보가 없을 경우
				setUser(null);
				setLoading(true);
				router.push('/login');
			}

			// 한번이라도 인증로직이 실행되면 초기상태 false처리
			setInitialLoading(false);
		});
	}, [router]);

	// 회원가입 함수
	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUser(userInfo.user);
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
				setUser(userInfo.user);
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
				setUser(null);
			})
			.catch((err) => alert(err.message))
			.finally(() => setLoading(false));
	};

	return (
		<AuthContext.Provider value={{ User, signIn, signUp, logout, Error, Loading }}>
			{!InitialLoading && children}
		</AuthContext.Provider>
	);
};

// 전역 context에 접근하기 위한 커스텀 훅
export default function useAuth() {
	return useContext(AuthContext);
}
