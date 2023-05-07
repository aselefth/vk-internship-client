import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function checkAuth() {
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
}