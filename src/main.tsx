import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import {
	UpdateUserPage,
	ProtecredRoute,
	UserPage,
	AuthLayout,
	ReceivedRequestsPage,
	FriendsPage,
	FeedPage,
	AccountPage,
	SignInPage,
	SignUpPage,
	RootLayout
} from './index.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <ProtecredRoute />,
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
					{
						path: '/users/:id',
						element: <UserPage />
					},
					{
						path: '/account/update',
						element: <UpdateUserPage />
					}
				]
			}
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<CookiesProvider>
			<RouterProvider router={router} />
		</CookiesProvider>
	</Provider>
);
