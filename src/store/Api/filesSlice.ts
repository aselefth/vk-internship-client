import { mainApiSlice } from '.';

const filesSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		uploadPostFile: build.mutation<{ok: boolean}, { file: File; postId: string }>({
			query: ({ file, postId }) => ({
				url: 'files/posts',
				method: 'POST',
				body: (() => {
                    const form = new FormData();
                    form.append('file', file);
                    form.append('postId', postId);
                    return form;
                })()
			}),
			invalidatesTags: ['App']
		}),
		getFile: build.query<any, { postId?: string; userId?: string }>({
			query: ({ postId, userId }) => ({
				url: (() => {
					if (postId) {
						return 'files?postId=' + postId;
					}
					return 'files?userId=' + userId;
				})(),
				headers: {
					'Content-Type': 'image/png'
				}
			}),
			providesTags: ['User', 'Posts']
		}),
		uploadUserFile: build.mutation<{ok: boolean}, { file: File; postId: string }>({
			query: ({ file, postId }) => ({
				url: 'files/users',
				method: 'POST',
				body: (() => {
                    const form = new FormData();
                    form.append('file', file);
                    form.append('postId', postId);
                    return form;
                })()
			}),
			invalidatesTags: ['App']
		}),
	})
});

export const { useGetFileQuery, useUploadPostFileMutation, useUploadUserFileMutation } = filesSlice;
