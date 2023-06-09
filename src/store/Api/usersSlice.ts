import { mainApiSlice } from ".";
import { UpdateUserDto } from "../../pages/UpdateUserPage/UpdateUserPage";
import { UserType } from "../../types/user";

const usersSlice = mainApiSlice.injectEndpoints({
   endpoints: (build) => ({
      getMe: build.query<UserType, undefined>({
         query: () => ({
            url: "users/getme"
         }),
         providesTags: ["User"]
      }),
      getUserById: build.query<Omit<UserType, "password">, string>({
         query: (userId) => ({
            url: `/users/${userId}`
         }),
         providesTags: ["User"]
      }),
      updateMe: build.mutation<{ ok: boolean }, UpdateUserDto>({
         query: (updateUserDto) => ({
            url: "/users",
            method: "PUT",
            body: updateUserDto
         }),
         invalidatesTags: ["User"]
      }),
      getSubs: build.query<
         { subs: Pick<UserType, "id">[]; ok: boolean },
         string
      >({
         query: (id) => ({
            url: `/users/${id}/subscribers`
         }),
         providesTags: ["User"]
      }),
      getSubscriptions: build.query<
         { subs: Pick<UserType, "id">[]; ok: boolean },
         string
      >({
         query: (id) => ({
            url: `/users/${id}/subscriptions`
         }),
         providesTags: ["User"]
      })
   })
});

export const {
   useGetMeQuery,
   useGetUserByIdQuery,
   useUpdateMeMutation,
   useGetSubsQuery,
   useGetSubscriptionsQuery
} = usersSlice;
