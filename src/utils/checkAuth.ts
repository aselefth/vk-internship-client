import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { setUser } from '../store/userSlice';
import { useCookies } from 'react-cookie';

export function checkAuth() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [{ jwt_token }] = useCookies(['jwt_token']);

	useLayoutEffect(() => {
		if (!jwt_token) {
			localStorage.removeItem('user');
			navigate('vk-internship-client/auth/signin');
		}
		const user = JSON.parse(`${localStorage.getItem('user')}`);
		dispatch(setUser({user}));

		if (location.pathname === '/') {
			navigate('vk-internship-client/feed');
		}
	}, []);
}
