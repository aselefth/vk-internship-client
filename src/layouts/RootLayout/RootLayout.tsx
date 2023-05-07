import { Outlet } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../components/Post/Post';

export function RootLayout() {
	const navigate = useNavigate();

	useLayoutEffect(() => {
		const jwtCookie = document.cookie;
		if (!jwtCookie) {
			navigate('/signin');
		}
	}, []);

	return (
		<main>
			<Post />
			<Outlet />
		</main>
	);
}
