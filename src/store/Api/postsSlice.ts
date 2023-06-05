import { mainApiSlice } from '.';
import { PostType } from '../../types/post';

const postsSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		getAllPosts: build.query<{ id: string }[], undefined>({
			query: () => ({
				url: 'posts',
				method: 'GET'
			}),
			providesTags: ['Posts']
		}),
		getPostById: build.query<PostType, string>({
			query: (postId) => ({
				url: `posts/${postId}`,
				method: 'GET'
			}),
			providesTags: (res, err, arg) =>
				res ? [{ type: 'Posts' as const, id: res.id }] : ['Posts']
		}),
		getUserPosts: build.query<PostType[], string>({
			query: (userId) => ({
				url: `/posts/userposts/${userId}`
			}),
			providesTags: ['Posts']
		}),
		likePost: build.mutation<any, { postId: string }>({
			query: (body) => ({
				url: '/posts/like',
				method: 'POST',
				body
			}),
			invalidatesTags: (res, err, arg) => [{type: 'Posts', id: arg.postId}]
		}),
		createPost: build.mutation<{ id: string }, Pick<PostType, 'post'>>({
			query: (body) => ({
				url: '/posts',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Posts']
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
