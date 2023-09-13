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

interface IAuth {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
}

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
};
