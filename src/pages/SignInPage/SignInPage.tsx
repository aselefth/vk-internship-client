import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignInMutation } from '../../store/Api/authSlice';
import { SignInType } from '../../types/authTypes';
import { useNavigate } from 'react-router-dom';
import { UISignInForm } from './UIForm';

export function SignInPage() {
	const { register, handleSubmit } = useForm<SignInType>();
	const [signIn] = useSignInMutation();
	const navigate = useNavigate();
	async function handleSignIn(signInDto: SignInType) {
		try {
			const res = await signIn(signInDto).unwrap();
			if (res.id) {
				navigate('/feed');
			}
		} catch (e) {
			console.error(e);
		}
	}

	const onSubmit: SubmitHandler<SignInType> = (data) => {
		handleSignIn(data);
	};

	return (
		<UISignInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
	);
}
