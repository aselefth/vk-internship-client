import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
	endpoints: () => ({})
});
