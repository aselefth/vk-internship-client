import { Outlet } from 'react-router-dom';
import { TopBar } from '../../components/TopBar/TopBar';
import styles from './RootLayout.module.scss';
import { checkAuth } from '../../utils/checkAuth';
import { Navigation } from '../../components/Navigation/Navigation';

export function RootLayout() {

	checkAuth();

	return (
		<main className={styles.main}>
			<TopBar />
			<Navigation />
			<Outlet />
		</main>
	);
}
