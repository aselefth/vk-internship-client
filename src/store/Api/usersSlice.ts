import { mainApiSlice } from ".";
import { UserType } from "../../types/user";

const usersSlice = mainApiSlice.injectEndpoints({
    endpoints: build => ({
        getMe: build.query<UserType, undefined>({
            query: () => ({
                url: 'users/getme'
            }),
            providesTags: ['App']
        }),
        getUserById: build.query<Omit<UserType, 'password'>, string>({
            query: (userId) => ({
                url: `/users/${userId}`
            }),
            providesTags: ['App']
        })
    })
})

export const {useGetMeQuery, useGetUserByIdQuery} = usersSlice;