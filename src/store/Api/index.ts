import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL + '/api',
		credentials: 'include',
		mode: 'cors',
		prepareHeaders(headers) {
			return headers;
		}
	}),
	tagTypes: ['App', 'Posts', 'User', 'Subs'],
	endpoints: () => ({})
});
