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

export function Navigation() {
	const navigate = useNavigate();
	const currentPath = useCurrentPath();

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
			<div
				className={styles.navLink}
				onClick={(_) => navigate('/auth')}
			>
				<FontAwesomeIcon icon={faDoorOpen} />
				<span>выйти</span>
			</div>
		</aside>
	);
}
