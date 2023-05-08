import { mainApiSlice } from ".";
import { UserType } from "../../types/user";

const friendsSlice = mainApiSlice.injectEndpoints({
    endpoints: build => ({
        getFriends: build.query<UserType[], undefined>({
            query: () => ({
                url: 'friends'
            }),
            providesTags: ['App']
        }),
        deleteFriend: build.mutation<any, string>({
            query: (recieverId) => ({
                url: 'friends',
                method: 'DELETE',
                body: {recieverId}
            })
        })
    })
})

export const {useGetFriendsQuery, useDeleteFriendMutation} = friendsSlice;