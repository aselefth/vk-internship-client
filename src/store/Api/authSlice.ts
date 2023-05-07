import { mainApiSlice } from '.';
import { SignInType, SignUpType } from '../../types/authTypes';

const authSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation<any, SignUpType>({
			query: (body) => ({
				url: 'auth/signup',
				body,
				method: 'POST'
			})
		}),
		signIn: build.mutation<any, SignInType>({
			query: (body) => ({
				url: 'auth/signin',
				body,
				method: 'POST',
				credentials: 'include',
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
