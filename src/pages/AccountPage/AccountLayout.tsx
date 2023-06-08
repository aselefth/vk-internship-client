import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

export function AccountLayout(params: { userId: string }) {
	const navigate = useNavigate();
	const location = useLocation();

	const [tab, setTab] = useState(location.pathname.split('/')[2]);
	return (
		<>
			<div className='tabs w-full'>
				<span
					className={`tab tab-bordered w-1/2 text-lg ${
						tab === 'posts' && 'tab-active'
					}`}
					onClick={() => {
						setTab('posts');
						navigate(`/${params.userId}/posts`);
					}}
				>
					Публикации
				</span>
				<span
					className={`tab tab-bordered w-1/2 text-lg ${
						tab === 'liked' && 'tab-active'
					}`}
					onClick={() => {
						setTab('liked');
						navigate(`/${params.userId}/liked`);
					}}
				>
					Понравившееся
				</span>
			</div>
			<Outlet />
		</>
	);
}
