import { useState } from 'react';
import styles from './CreatePostModal.module.scss';
import { useCreatePostMutation } from '../../store/Api/postsSlice';
import { PostType } from '../../types/post';
import { useUploadMutation } from '../../store/Api/filesSlice';
import { useNavigate } from 'react-router-dom';

type PostData = {
	post: string;
	file: File | null;
};

export function CreatePostModal() {
	const [postData, setPostData] = useState<PostData>({
		post: '',
		file: null
	});
	const [addPost] = useCreatePostMutation();
	const [addFile] = useUploadMutation();
	const navigate = useNavigate();

	async function handleCreatePost(postBody: Pick<PostType, 'post'>) {
		try {
			const { id: postId } = await addPost(postBody).unwrap();
			if (postData.file === null) {
				navigate('/feed');
			}

			const response = await fetch('http://localhost:3001/api/files', {
				method: 'POST',
				body: (() => {
					const form = new FormData();
					form.append('file', postData?.file!);
					form.append('postId', postId);
					return form;
				})()
			});

            const res: {ok: boolean} = await response.json();

			if (res.ok) {
				navigate('/feed');
			} else {
				console.log('FILE UPLOAD ERROR');
			}

			setPostData({ post: '', file: null });
		} catch (e) {
			console.error(e);
		}
	}

	// async function handleUploadFile({
	// 	postId,
	// 	file
	// }: {
	// 	postId: string;
	// 	file: File;
	// }): Promise<boolean> {
	// 	try {
	// 		const { ok } = await addFile({ postId, file }).unwrap();
	// 		if (ok) {
	// 			return true;
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 		return false;
	// 	}
	// 	return false;
	// }

	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				handleCreatePost({ post: postData.post });
			}}
		>
			<label>Есть, чем поделиться? Поделитесь здесь</label>
			<textarea
				name='post'
				value={postData.post}
				onChange={(e) =>
					setPostData({ ...postData, post: e.target.value })
				}
			/>
			<input
				type='file'
				onChange={(e) =>
					setPostData((prev) => ({
						...prev,
						file: e?.target?.files![0]
					}))
				}
			/>
			<button type='submit'>добавить</button>
		</form>
	);
}
