import { mainApiSlice } from ".";
import { UserType } from "../../types/user";

const usersSlice = mainApiSlice.injectEndpoints({
    endpoints: build => ({
        getMe: build.query<UserType, undefined>({
            query: () => ({
                url: 'users/getme'
            })
        })
    })
})

export const {useGetMeQuery} = usersSlice;