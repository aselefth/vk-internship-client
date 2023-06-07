import { useCookies } from 'react-cookie';
import jwt from 'jwt-decode';

type SessionType = {
	email: string;
	id: string;
};

export function getSession(): null | SessionType {
	const [{ jwt_token }] = useCookies(['jwt_token']);
	const session: SessionType = jwt(jwt_token);

    if (!session) {
        return null;
    } 

    return session;
}
