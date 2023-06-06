import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
	const navigate = useNavigate();

	return (
		<nav className='flex fixed top-0 left-0 right-0 py-4 border-white border-b-2 z-50 bg-gray-900'>
			<div className='flex items-center max-w-[1200px] w-full px-4 xl:px-0 mx-auto'>
				<p
					className='cursor-pointer flex items-center gap-2'
					onClick={(_) => {
						navigate('/feed');
					}}
				>
					<FontAwesomeIcon icon={faVk} className='text-3xl' />
				</p>
			</div>
		</nav>
	);
}
