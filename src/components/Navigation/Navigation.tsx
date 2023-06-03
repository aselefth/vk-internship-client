import {
	faDoorOpen,
	faUserGroup,
	faPassport,
	faNewspaper,
	faSignsPost
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navigation.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCurrentPath } from '../../hooks/useCurrentPath';
import { useLazySignOutQuery } from '../../store/Api/authSlice';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/userSlice';

export function Navigation() {
	const navigate = useNavigate();
	const currentPath = useCurrentPath();
	const [signOut] = useLazySignOutQuery();
	const dispatch = useAppDispatch();

	async function handleSignOut() {
		try {
			await signOut(undefined);
			navigate('/auth/signin');
			dispatch(
				setUser({
					user: {
						id: '',
						firstName: '',
						lastName: '',
						email: '',
						password: '',
						city: '',
						university: '',
						age: 0
					}
				})
			);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<aside className={styles.aside}>
			<div
				className={`${styles.navLink} ${
					currentPath === 'account' && styles.active
				}`}
				onClick={(_) => navigate('/account')}
			>
				<FontAwesomeIcon icon={faPassport} />
				<span>аккаунт</span>
			</div>
			<div
				className={`${styles.navLink} ${
					currentPath === 'feed' && styles.active
				}`}
				onClick={(_) => navigate('/feed')}
			>
				<FontAwesomeIcon icon={faNewspaper} />
				<span>лента</span>
			</div>
			<div
				className={`${styles.navLink} ${
					currentPath === 'friends' && styles.active
				}`}
				onClick={(_) => navigate('/friends')}
			>
				<FontAwesomeIcon icon={faUserGroup} />
				<span>друзья</span>
			</div>
			<div
				className={`${styles.navLink} ${
					currentPath === 'requests' && styles.active
				}`}
				onClick={(_) => navigate('/requests')}
			>
				<FontAwesomeIcon icon={faSignsPost} />
				<span>запросы</span>
			</div>
			<div className={styles.navLink} onClick={handleSignOut}>
				<FontAwesomeIcon icon={faDoorOpen} />
				<span>выйти</span>
			</div>
		</aside>
	);
}
