import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

export function AccountLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.pathname);
	const [tab, setTab] = useState<'/account/posts' | '/account/liked'>(location.pathname as '/account/posts' | '/account/liked');
	return (
		<>
			<div className='tabs w-full'>
				<span
					className={`tab tab-bordered w-1/2 text-lg ${tab === '/account/posts' && 'tab-active'}`}
					onClick={() => {
						setTab('/account/posts');
						navigate('/account/posts');
					}}
				>
					Публикации
				</span>
				<span
					className={`tab tab-bordered w-1/2 text-lg ${tab === '/account/liked' && 'tab-active'}`}
					onClick={() => {
						setTab('/account/liked');
						navigate('/account/liked');
					}}
				>
					Понравившееся
				</span>
			</div>
			<Outlet />
		</>
	);
}
