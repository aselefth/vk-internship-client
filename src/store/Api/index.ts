import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const mainApiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/api',
		credentials: 'include',
		mode: 'cors',
		prepareHeaders(headers) {
			return headers;
		}
	}),
	tagTypes: ['App'],
	endpoints: () => ({})
});
