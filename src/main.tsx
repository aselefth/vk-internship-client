import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { 
	RouterProvider, 
	createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout/RootLayout.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { SignUpPage } from './pages/SignUpPage/SignUpPage.tsx';
import { AccountPage } from './pages/AccountPage/AccountPage.tsx';
import { FeedPage } from './pages/FeedPage/FeedPage.tsx';
import { FriendsPage } from './pages/FriendsPage/FriendsPage.tsx';
import { ReceivedRequestsPage } from './pages/ReceivedRequestsPage/ReceivedRequestsPage.tsx';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout.tsx';
import { CookiesProvider } from 'react-cookie';
import { UserPage } from './pages/UserPage/UserPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/friends',
				element: <FriendsPage />
			},
			{
				path: '/account',
				element: <AccountPage />
			},
			{
				path: '/feed',
				element: <FeedPage />
			},
			{
				path: '/requests',
				element: <ReceivedRequestsPage />
			},
			// {
			// 	path: '/users/:id',
			// 	element: <UserPage />
			// }
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: '/auth/signin',
				element: <SignInPage />
			},
			{
				path: '/auth/signup',
				element: <SignUpPage />
			}
		]
	}
]);
console.log(router);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<CookiesProvider>
			<RouterProvider router={router} />
			
		</CookiesProvider>
	</Provider>
);
