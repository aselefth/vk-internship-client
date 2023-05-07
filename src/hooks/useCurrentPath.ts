import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useCurrentPath() {
	const { pathname } = useLocation();
	const [currentPath, setCurrentPath] = useState<
		'feed' | 'account' | 'friends' | 'requests'
	>('feed');

	useEffect(() => {
		switch (true) {
			case /\/feed[\/\w]{0,}/g.test(pathname):
				setCurrentPath('feed');
				break;
			case /\/account[\/\w]{0,}/g.test(pathname):
				setCurrentPath('account');
				break;
			case /\/friends[\/\w]{0,}/g.test(pathname):
				setCurrentPath('friends');
				break;
			case /\/requests[\/\w]{0,}/g.test(pathname):
				setCurrentPath('requests');
				break;
		}
	}, [pathname]);

	return currentPath;
}
