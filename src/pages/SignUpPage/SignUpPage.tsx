import { useSignUpMutation } from '../../store/Api/authSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignUpType } from '../../types/authTypes';
import { UISignUpForm } from './UIForm';

export function SignUpPage() {
	const [signUp] = useSignUpMutation();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<SignUpType>();

	async function handleSignUp(signUpDto: SignUpType) {
		try {
			await signUp(signUpDto);
			navigate('/auth/signin');
		} catch (e) {
			console.error(e);
		}
	}

	const onSubmit: SubmitHandler<SignUpType> = (data) => {
		handleSignUp(data);
	};

	return (
		<UISignUpForm
			register={register}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
		/>
	);
}
