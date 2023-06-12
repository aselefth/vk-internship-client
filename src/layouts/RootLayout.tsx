import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export function RootLayout() {
	
	return (
		<main className='max-w-1200 mx-auto grid lg:grid-cols-[350px_1fr_350px] relative grid-cols-1'>
			<Navigation />
			<div className='w-full border-gray-600 border-r-[1px] border-l-[1px] relative min-h-[100vh] pb-20'>
				<Outlet />
			</div>
		</main>
	);
}
