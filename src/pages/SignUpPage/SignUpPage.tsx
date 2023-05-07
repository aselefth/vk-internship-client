import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SignUpPage.module.scss';
import { faEnvelope, faLock, faFaceSmile, faPassport, faCity, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { useSignUpMutation } from '../../store/Api/authSlice';
import {useForm, SubmitHandler} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignUpType } from '../../types/authTypes';

export function SignUpPage() {

	const [signUp] = useSignUpMutation();
	const navigate = useNavigate();
	const {register, handleSubmit} = useForm<SignUpType>();

	async function handleSignUp (signUpDto: SignUpType) {
		try {
			await signUp(signUpDto);
			navigate('/auth/signin')
		} catch (e) {
			console.error(e);
		}
	}

	const onSubmit: SubmitHandler<SignUpType> = data => {
		handleSignUp(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1>Регистрация</h1>
			<div className={styles.inputs}>
			<div className={styles.inputContainer}>
					<input type='text' {...register("firstName", {required: true, minLength: 3, maxLength: 20})}/>
					<span>
						<FontAwesomeIcon icon={faFaceSmile} /> имя
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='text' {...register("lastName", {required: true, minLength: 3, maxLength: 20})}/>
					<span>
						<FontAwesomeIcon icon={faPassport} /> фамилия
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='number' {...register("age", {required: true, valueAsNumber: true})}/>
					<span>
						<FontAwesomeIcon icon={faPassport} /> возраст
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='text'  {...register("city", {required: true})}/>
					<span>
						<FontAwesomeIcon icon={faCity} /> город
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='text'  {...register("university", {required: true})}/>
					<span>
						<FontAwesomeIcon icon={faBuildingColumns} /> университет
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='text'  {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}/>
					<span>
						<FontAwesomeIcon icon={faEnvelope} /> почта
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='password'  {...register("password", {required: true})}/>
					<span>
						<FontAwesomeIcon icon={faLock} /> пароль
					</span>
				</div>
			</div>

			<div className={styles.links}>
				<button type='submit'>Зарегистрироваться</button>
				<p>
					Есть аккаунт? <a href='/auth/signin'>Войти</a>
				</p>
			</div>
		</form>
	);
}
