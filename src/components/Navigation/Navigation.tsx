import {
	faDoorOpen,
	faUserGroup,
	faPassport,
	faNewspaper,
	faSignsPost
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useLazySignOutQuery } from '../../store/Api/authSlice';

const routes = [
	{ path: 'account/posts', name: 'Аккаунт', icon: faPassport },
	{ path: 'feed', name: 'Лента', icon: faNewspaper },
	{ path: 'friends', name: 'Друзья', icon: faUserGroup },
	{ path: 'requests', name: 'Запросы', icon: faSignsPost },
	{ path: 'signout', name: 'Выход', icon: faDoorOpen }
];

export function Navigation() {
	const navigate = useNavigate();
	const [signOut] = useLazySignOutQuery();

	async function handleSignOut() {
		try {
			await signOut(undefined);
			navigate('/auth/signin');
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<aside className='flex flex-col items-end mx-auto pt-4 w-full pr-2'>
			<nav className='flex flex-col items-start fixed'>
				{routes.map((route) => (
					<div
						key={route.path}
						className={`text-lg text-white flex items-center gap-4 px-4 py-2 hover:bg-purple-900 
						transition duration-[.2s] rounded-[1000px] hover:cursor-pointer`}
						onClick={
							route.path === 'signout'
								? handleSignOut
								: () => navigate(`/${route.path}`)
						}
					>
						<FontAwesomeIcon icon={route.icon} />
						<span>{route.name}</span>
					</div>
				))}
			</nav>
		</aside>
	);
}
