import { mainApiSlice } from '.';
import { UserType } from '../../types/user';

const requestsSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		getSentRequests: build.query<{ sentRequests: UserType[] }, undefined>({
			query: () => ({
				url: 'requests/myrequests'
			}),
			providesTags: ['App']
		}),
		getReceivedRequests: build.query<{recievedRequests: UserType[]}, undefined>({
			query: () => ({
				url: 'requests/recievedrequests'
			}),
			providesTags: ['App']
		}),
		sendRequest: build.mutation<any, string>({
			query: (recieverId) => ({
				url: 'requests',
				method: 'POST',
				body: { recieverId }
			}),
			invalidatesTags: ['App']
		}),
		acceptRequest: build.mutation<any, string>({
			query: (recieverId) => ({
				url: 'requests/accept',
				method: 'POST',
				body: { recieverId }
			}),
			invalidatesTags: ['App']
		}),
        declineRequest: build.mutation<any, string>({
            query: (recieverId) => ({
                url: '/requests/decline',
                method: 'POST',
                body: {recieverId}
            }),
            invalidatesTags: ['App']
        })
	})
});

export const {
	useGetReceivedRequestsQuery,
	useGetSentRequestsQuery,
	useSendRequestMutation,
	useAcceptRequestMutation,
    useDeclineRequestMutation
} = requestsSlice;
