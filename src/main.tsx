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
	FeedPage,
	AccountPage,
	SignInPage,
	SignUpPage,
	RootLayout,
	UserLikedPage,
	UserPostsPage,
	SubsFeedPage,
	SubscribersPage,
	SubscriptionsPage
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
						path: '/:id/subscribers',
						element: <SubscribersPage />
					},
					{
						path: '/:id/subscriptions',
						element: <SubscriptionsPage />
					},
					{
						path: '/feed',
						element: <FeedPage />
					},
					{
						path: '/subscribed',
						element: <SubsFeedPage />
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
