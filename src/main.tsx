import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import {
	UpdateUserPage,
	ProtecredRoute,
	AuthLayout,
	ReceivedRequestsPage,
	FriendsPage,
	FeedPage,
	AccountPage,
	SignInPage,
	SignUpPage,
	RootLayout,
	UserLikedPage,
	UserPostsPage
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
						path: '/:id',
						element: <AccountPage />,
						children: [
							{
								path: '/:id/posts',
								element: <UserPostsPage />
							},
							{
								path: '/:id/liked',
								element: <UserLikedPage />
							}
						]
					},
					{
						path: '/feed',
						element: <FeedPage />
					},
					{
						path: '/subscribed',
						element: <ReceivedRequestsPage />
					},
					{
						path: '/update',
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
