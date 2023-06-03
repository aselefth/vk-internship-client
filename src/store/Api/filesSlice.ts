import { mainApiSlice } from '.';

const filesSlice = mainApiSlice.injectEndpoints({
	endpoints: (build) => ({
		upload: build.mutation<{ok: boolean}, { file: File; postId: string }>({
			query: ({ file, postId }) => ({
				url: 'files',
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
				})()
			}),
			providesTags: ['App']
		})
	})
});

export const { useGetFileQuery, useUploadMutation } = filesSlice;
