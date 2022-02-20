import { createContext, useContext, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";

const auth = getAuth();
let recaptchaVerifier;

const AuthContext = createContext({
	user: null,
	sendCode: () => {},
	verifyCode: () => {},
	logout: () => {}
});

export function AuthContextProvider(props) {
	const [user, setUser] = useState(null);

	const sendCode = async (number) => {
		let phone = '+91'+number;

		const captcha = async (phone) => {
			recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  			'size': 'invisible'
			}, auth);
		}
		await captcha(phone);
		return await onSignInSubmit(phone);
	}

	async function onSignInSubmit(phone) {	
			const appVerifier = recaptchaVerifier;
			try {
				const response = await signInWithPhoneNumber(auth, phone, appVerifier);
				return response;
			} catch (error) {
				return error.message;
			}
	}

	const verifyCode = async (confirmation, code) => {
		try {
			const response = await confirmation.confirm(code);
			setUser(response.user);
		} catch (error) {
			console.log(error.message);
		}
	}

	const logout = async () => {
		await signOut(auth);
		setUser(null);
	}

	const context = { user, setUser, sendCode, verifyCode, logout };

	return (
		<AuthContext.Provider value={context} {...props}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default function UseAuthContext() {
	return useContext(AuthContext);
}