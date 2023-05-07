import styles from './SignInPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

export function SignInPage() {
	return (
		<form className={styles.form}>
			<h1>Вход</h1>
			<div className={styles.inputs}>
				<div className={styles.inputContainer}>
					<input type='text' required/>
					<span>
						<FontAwesomeIcon icon={faEnvelope} /> почта
					</span>
				</div>
				<div className={styles.inputContainer}>
					<input type='password' required/>
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
