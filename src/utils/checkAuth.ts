import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../store/Api/usersSlice';
import { useAppDispatch } from '../hooks/redux';
import { setUser } from '../store/userSlice';
import jwt from 'jwt-decode';
import { useCookies } from 'react-cookie';

export function checkAuth() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [{ jwt_token }] = useCookies(['jwt_token']);

	useLayoutEffect(() => {
		if (!jwt_token) {
			localStorage.removeItem('user');
			navigate('/auth/signin');
		}
		const user = JSON.parse(`${localStorage.getItem('user')}`);
		dispatch(setUser({user}));

		if (location.pathname === '/') {
			navigate('/feed');
		}
	}, []);
}
