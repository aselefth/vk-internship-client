import { mainApiSlice } from '.';
import { SignInType, SignUpType } from '../../types/authTypes';
import { UserType } from '../../types/user';

const authSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation<any, SignUpType>({
			query: (body) => ({
				url: 'auth/signup',
				body,
				method: 'POST'
			}),
			invalidatesTags: ['App']
		}),
		signIn: build.mutation<UserType, SignInType>({
			query: (body) => ({
				url: 'auth/signin',
				body,
				method: 'POST',
				credentials: 'include',
			}),
			invalidatesTags: ['App']
		}),
		signOut: build.query({
			query: () => ({
				url: '/auth/signout'
			}),
			providesTags: ['App', 'Posts']
		})
	})
});

export const { useSignInMutation, useLazySignOutQuery, useSignUpMutation } =
	authSlice;
