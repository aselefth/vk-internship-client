import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {RootLayout} from './layouts/RootLayout/RootLayout.tsx';
import { RequestsLayout } from './layouts/RequestsLayout/RequestsLayput.tsx';
import { SignInPage } from './pages/SignInPage/SignInPage.tsx';
import { SignUpPage } from './pages/SignUpPage/SignUpPage.tsx';
import { AccountPage } from './pages/AccountPage/AccountPage.tsx';
import { FeedPage } from './pages/FeedPage/FeedPage.tsx';
import { FriendsPage } from './pages/FriendsPage/FriendsPage.tsx';
import { ReceivedRequestsPage } from './pages/ReceivedRequestsPage/ReceivedRequestsPage.tsx';
import { SentRequestsPage } from './pages/SentRequestsPage/SentRequestsPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      },
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
        element: <RequestsLayout />,
        children: [
          {
            path: '/requests/sentrequests',
            element: <SentRequestsPage />
          },
          {
            path: '/requests/recievedrequests',
            element: <ReceivedRequestsPage />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
