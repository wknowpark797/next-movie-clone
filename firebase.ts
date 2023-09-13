import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
	authDomain: 'dcode-community-11ff2.firebaseapp.com',
	projectId: 'dcode-community-11ff2',
	storageBucket: 'dcode-community-11ff2.appspot.com',
	messagingSenderId: '1064287537669',
	appId: '1:1064287537669:web:149e3b2716b18379f2aa6c',
};
// firebase로 구동되는 앱이 없으면 아직 인증처리 되지 않았기 때문에
// 인증처리가 되지 않은 상태에서만 초기화 (불필요한 인증객체 초기화 방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export default app;
export { auth };
