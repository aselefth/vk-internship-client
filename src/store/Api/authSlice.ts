import { mainApiSlice } from '.';
import { AuthType } from '../../types/authTypes';

const authSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation({
			query: (body: AuthType) => ({
				url: 'auth/signup',
				body,
				method: 'POST'
			})
		}),
		signIn: build.mutation({
			query: (body: Pick<AuthType, 'email' | 'password'>) => ({
				url: 'auth/signin',
				body,
				method: 'POST'
			})
		}),
		signOut: build.query({
			query: () => ({
				url: '/auth/signout'
			})
		})
	})
});

export const { useSignInMutation, useLazySignOutQuery, useSignUpMutation } =
	authSlice;
