import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export function checkAuth() {
	const location = useLocation();
	const navigate = useNavigate();
	const [{ jwt_token }] = useCookies(['jwt_token']);

	useLayoutEffect(() => {
		if (!jwt_token) {
			navigate('/auth/signin');
		}

		if (location.pathname === '/') {
			navigate('/feed');
		}
	}, []);
}
