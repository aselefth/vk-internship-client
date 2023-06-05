import { mainApiSlice } from ".";
import { UpdateUserDto } from "../../pages/UpdateUserPage/UpdateUserPage";
import { UserType } from "../../types/user";

const usersSlice = mainApiSlice.injectEndpoints({
    endpoints: build => ({
        getMe: build.query<UserType, undefined>({
            query: () => ({
                url: 'users/getme'
            }),
            providesTags: ['App', 'User']
        }),
        getUserById: build.query<Omit<UserType, 'password'>, string>({
            query: (userId) => ({
                url: `/users/${userId}`
            }),
            providesTags: ['App']
        }),
        updateMe: build.mutation<{ok: boolean}, UpdateUserDto>({
            query: (updateUserDto) => ({
                url: '/users',
                method: 'PUT',
                body: updateUserDto
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {useGetMeQuery, useGetUserByIdQuery, useUpdateMeMutation} = usersSlice;