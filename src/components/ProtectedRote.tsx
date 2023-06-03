import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtecredRoute() {
	const [{ jwt_token }] = useCookies(['jwt_token']);

	const getIsAuthorized = () => (jwt_token ? true : false);

	if (!getIsAuthorized()) {
		return <Navigate to='/auth/signin' />;
	}

	return <Outlet />;
}
