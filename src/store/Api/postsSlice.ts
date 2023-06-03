import { mainApiSlice } from '.';
import { PostType } from '../../types/post';

const postsSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		getAllPosts: build.query<{ id: string }[], undefined>({
			query: () => ({
				url: 'posts',
				method: 'GET'
			}),
			providesTags: ['App']
		}),
		getPostById: build.query<PostType, string>({
			query: (postId) => ({
				url: `posts/${postId}`,
				method: 'GET'
			}),
			providesTags: ['App']
		}),
		getUserPosts: build.query<PostType[], string>({
			query: (userId) => ({
				url: `/posts/userposts/${userId}`
			}),
			providesTags: ['App']
		}),
		likePost: build.mutation<any, { postId: string }>({
			query: (body) => ({
				url: '/posts/like',
				method: 'POST',
				body
			}),
			invalidatesTags: ['App']
		}),
		createPost: build.mutation<{id: string}, Pick<PostType, 'post'>>({
			query: (body) => ({
				url: '/posts',
				method: 'POST',
				body
			}),
			invalidatesTags: ['App']
		})
	})
});

export const {
	useGetAllPostsQuery,
	useGetPostByIdQuery,
	useLikePostMutation,
	useCreatePostMutation,
	useGetUserPostsQuery
} = postsSlice;
