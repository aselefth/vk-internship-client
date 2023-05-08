import styles from './SignInPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {useForm, SubmitHandler} from 'react-hook-form';
import { useSignInMutation } from '../../store/Api/authSlice';
import { SignInType } from '../../types/authTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/userSlice';


export function SignInPage() {

	const {register, handleSubmit} = useForm<SignInType>();
	const [signIn] = useSignInMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	async function handleSignIn(signInDto: SignInType) {
		try {
			const res = await signIn(signInDto).unwrap();
			console.log(res);
			if (res.id) {
				localStorage.setItem('user', JSON.stringify(res));
				navigate('/feed');
			}
		} catch (e) {
			console.error(e);
		}
	}

	const onSubmit: SubmitHandler<SignInType> = data => {
		handleSignIn(data);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1>Вход</h1>
			<div className={styles.inputs}>
				<div className={styles.inputContainer}>
					<input type='text' {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}/>
					<span>
						<FontAwesomeIcon icon={faEnvelope} /> почта
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='password' {...register("password", {required: true, minLength: 3})}/>
					<span>
						<FontAwesomeIcon icon={faLock} /> пароль
					</span>
				</div>
			</div>

			<div className={styles.links}>
				<button type='submit'>Войти</button>
				<p>
					Нет аккаунта? <a href='/auth/signup'>Зарегистрироваться</a>
				</p>
			</div>
		</form>
	);
}
