import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TopBar.module.scss';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
	const navigate = useNavigate();

	return (
		<nav className={styles.navContainer}>
			<div className={styles.navBar}>
				<p
					className={styles.logo}
					onClick={(_) => {
						navigate('/feed');
					}}
				>
					<FontAwesomeIcon icon={faVk} />
					<span>internship</span>
				</p>
			</div>
		</nav>
	);
}
