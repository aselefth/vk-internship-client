import { mainApiSlice } from ".";
import { UserType } from "../../types/user";

const requestsSlice = mainApiSlice.injectEndpoints({
   endpoints: (build) => ({
      getSentRequests: build.query<{ sentRequests: UserType[] }, undefined>({
         query: () => ({
            url: "requests/myrequests"
         }),
         providesTags: ["Subs"]
      }),
      getReceivedRequests: build.query<
         { recievedRequests: UserType[] },
         undefined
      >({
         query: () => ({
            url: "requests/recievedrequests"
         }),
         providesTags: ["Subs"]
      }),
      sendRequest: build.mutation<any, string>({
         query: (recieverId) => ({
            url: "requests",
            method: "POST",
            body: { recieverId }
         }),
         invalidatesTags: ["Subs", 'User']
      }),
      acceptRequest: build.mutation<any, string>({
         query: (recieverId) => ({
            url: "requests/accept",
            method: "POST",
            body: { recieverId }
         }),
         invalidatesTags: ["Subs", 'User']
      }),
      declineRequest: build.mutation<any, string>({
         query: (recieverId) => ({
            url: "/requests/decline",
            method: "POST",
            body: { recieverId }
         }),
         invalidatesTags: ["Subs", 'User']
      }),
      deleteMyRequest: build.mutation<any, { recieverId: string }>({
         query: (body) => ({
            url: "/requests",
            method: "DELETE",
            body
         }),
         invalidatesTags: ["Subs", 'User']
      }),
      getIsSubscribed: build.query<{ok: boolean; isSubscribed: boolean}, string>({
         query: (id) => ({
            url: `/requests/${id}/isSubscribed`
         }),
         providesTags: ['Subs']
      }),

   })
});

export const {
   useGetReceivedRequestsQuery,
   useGetSentRequestsQuery,
   useSendRequestMutation,
   useAcceptRequestMutation,
   useDeclineRequestMutation,
   useDeleteMyRequestMutation,
   useGetIsSubscribedQuery
} = requestsSlice;
