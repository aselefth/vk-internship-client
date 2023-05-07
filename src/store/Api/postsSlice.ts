import { mainApiSlice } from ".";
import {PostType} from '../../types/post';

const postsSlice = mainApiSlice.injectEndpoints({
    endpoints: build => ({
        getAllPosts: build.query<{id: string}[], undefined>({
            query: () => ({
                url: 'posts',
                method: 'GET'
            })
        }),
        getPostById: build.query<PostType, string>({
            query: (postId) => ({
                url: `posts/${postId}`,
                method: 'GET'
            }),
            providesTags: ['App']
        }),
        likePost: build.mutation<any, {userId: string, postId: string}>({
            query: (body) => ({
                url: '/posts/like',
                method: 'POST',
                body
            }),
            invalidatesTags: ['App']
        })
    })
})

export const {useGetAllPostsQuery, useGetPostByIdQuery, useLikePostMutation} = postsSlice;