import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SignUpPage.module.scss';
import { faEnvelope, faLock, faFaceSmile, faPassport } from '@fortawesome/free-solid-svg-icons';

export function SignUpPage() {
	return (
		<form className={styles.form}>
			<h1>Регистрация</h1>
			<div className={styles.inputs}>
			<div className={styles.inputContainer}>
					<input type='password' required />
					<span>
						<FontAwesomeIcon icon={faFaceSmile} /> имя
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='password' required />
					<span>
						<FontAwesomeIcon icon={faPassport} /> фамилия
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='text' required />
					<span>
						<FontAwesomeIcon icon={faEnvelope} /> почта
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='password' required />
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
