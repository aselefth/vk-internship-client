import {
	useGetPostByIdQuery,
	useLikePostMutation
} from '../../store/Api/postsSlice';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetUserByIdQuery } from '../../store/Api/usersSlice';
import jwt from 'jwt-decode';
import { getDateString } from '../../utils/getDate';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

interface PostProps {
	postId: string;
}

export function Post({ postId }: PostProps) {
	const [{ jwt_token }] = useCookies(['jwt_token']);
	const { data: post } = useGetPostByIdQuery(postId);
	const [likePost] = useLikePostMutation();
	const { data: user } = useGetUserByIdQuery(String(post?.userId), {
		skip: !getSession().id
	});
	const navigate = useNavigate();
	const [imgUrl, setImgUrl] = useState('');


	useEffect(() => {
		async function getImg(postId: string) {
			const res = await fetch(
				'http://localhost:3001/api/files?postId=' + postId
			);
			const data = new Uint8Array(await res.arrayBuffer());
			const blob = new Blob([data], { type: 'image/png' });
			const img = window.webkitURL.createObjectURL(blob);
			setImgUrl(img);
		}
		if (post && post.filePath) {
			getImg(post.id);
		}
	}, [post]);

	function getSession() {
		const sessionData: { id: string; email: string; iat: number } =
			jwt(jwt_token);

		return sessionData;
	}

	function getIsLiked(): boolean {
		const postLike = post?.likedBy.find(
			(usr) => usr.id === getSession().id
		);
		return postLike ? true : false;
	}

	function handleNavigateToUserPage() {
		const sessionData: { id: string; email: string; iat: number } =
			jwt(jwt_token);
		if (sessionData.id === user?.id) {
			navigate('/account');
		} else {
			navigate(`/users/${user?.id}`);
		}
	}

	async function handleToggleLike(body: { postId: string }) {
		try {
			await likePost(body);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className={styles.post}>
			<h2 onClick={(_) => handleNavigateToUserPage()}>
				{user?.firstName} {user?.lastName}
			</h2>
			<h3>{post && getDateString(`${post?.createdAt}`)}</h3>
			<p>{post?.post}</p>
			{imgUrl && <img src={imgUrl} />}
			<div className={styles.buttonsSection}>
				<FontAwesomeIcon
					icon={faHeart}
					color={getIsLiked() ? 'var(--mainBlue)' : 'black'}
					onClick={(_) =>
						handleToggleLike({
							postId: String(post?.id)
						})
					}
				/>
				<span>{post?.likedBy?.length}</span>
			</div>
		</div>
	);
}

