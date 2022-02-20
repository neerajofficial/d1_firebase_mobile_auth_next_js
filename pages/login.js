import { useState } from 'react'
import {withPublic} from './../routes/route'
import Image from 'next/image';
import useAuth from './../store/auth-context';
import TextInput from './../components/ui/text-input';
import Button from './../components/ui/button';
import imgpath from './../public/images/login_illustration.png';

function Login() {
	const [number, setNumber] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [code, setCode] = useState('');
	const [message, setMessage] = useState('');
	const {sendCode, verifyCode} = useAuth();

	const submitHandler = async e => {
		e.preventDefault();
		try {
			const response = await sendCode(number);
			setConfirmation(response);
			setMessage('Otp sent successfully.')
		} catch (error) {
			console.log(error);
		}
	}

	const verificationHandler = async e => {
		e.preventDefault();
		try {
			await verifyCode(confirmation, code);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="flex-col flex md:flex-row flex-1">
			<div className="flex flex-1 items-center justify-center">
				<div className="rounded-md flex-1">
					<div className="text-3xl font-semibold text-center" >
						Login Form
					</div>
					<form onSubmit={submitHandler}>
						<div id="sign-in-button"></div>
						<div className="py-2 justify-center flex-1">
							<TextInput 
								label="Mobile Number:" 
								value={number} 
								onChange={e => setNumber(e.target.value)} 
							/>
						</div>
						<div className="py-6 justify-center items-center flex">
							<Button  text="get otp" type="submit" onClick={submitHandler} />
						</div>
					</form>
					{message && <h3 className="text-center pb-6">{message}</h3>}

					<form onSubmit={verificationHandler}>
						<div className="py-2 justify-center flex-1">
							<TextInput 
								label="OTP: " 
								value={code} 
								onChange={e => setCode(e.target.value)} 
							/>
						</div>
						<div className="py-6 justify-center items-center flex">
							<Button  text="verify otp" type="submit" onClick={verificationHandler} />
						</div>
					</form>
				</div>
			</div>
			<div className="items-center hidden md:flex flex-col flex-1 justify-center">
      	<Image src={imgpath} alt='illustration' width={860} height={460} />
			</div>
    </div>
	)
}

export default withPublic(Login);