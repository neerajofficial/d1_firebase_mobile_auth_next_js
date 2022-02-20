import { useRouter } from 'next/router';
import useAuth from './../store/auth-context';

export function withPublic(Component) {
	return function withPublic(props) {
		const auth = useAuth();
		const router = useRouter();

		if (auth.user) {
			router.replace('/');
			return <h1>Loading...</h1>
		}
		return <Component auth={auth} {...props} />
	}
}


export function withProtected(Component) {
	return function withProtected(props) {
		const auth = useAuth();
		const router = useRouter();

		if (!auth.user) {
			router.replace('/login');
			return <h1>Loading...</h1>
		}
		return <Component auth={auth} {...props} />
	}
}