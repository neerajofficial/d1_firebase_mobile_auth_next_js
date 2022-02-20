import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useAuth from './../store/auth-context';

function AuthState({children}) {

	const {setUser} = useAuth();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			setUser(user);
			setLoading(false);
		})
	}, [])
	
	if (loading) {
		return <h1>Loaging...</h1>
	}
	return children
}

export default AuthState