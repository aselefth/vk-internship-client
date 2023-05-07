import { Outlet } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../../components/Post/Post';

export function RootLayout() {
	const location = useLocation();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		const jwtCookie = document.cookie;
		if (!jwtCookie) {
			navigate('/auth/signin');
		}
		if (location.pathname === '/') {
			navigate('/feed');
		}
	}, []);

	return (
		<main>
			<Outlet />
		</main>
	);
}
