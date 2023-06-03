import {
	useGetPostByIdQuery,
	useLikePostMutation
} from '../../store/Api/postsSlice';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../hooks/redux';
import { useGetUserByIdQuery } from '../../store/Api/usersSlice';
import jwt from 'jwt-decode';
import { getDateString } from '../../utils/getDate';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface PostProps {
	postId: string;
}

export function Post({ postId }: PostProps) {
	const [{ jwt_token }] = useCookies(['jwt_token']);
	const { data: post } = useGetPostByIdQuery(postId);
	const currentUserId = useAppSelector((state) => state.userSlice.id);
	const [likePost] = useLikePostMutation();
	const { data: user } = useGetUserByIdQuery(String(post?.userId), {skip: currentUserId?.length === 0});
	const navigate = useNavigate();
	
	function getIsLiked (): boolean {
		const sessionData: {id: string, email: string, iat: number} = jwt(jwt_token);
		const postLike = post?.likedBy.find(usr => usr.id === sessionData.id);
		return postLike ? true : false
	}

	function handleNavigateToUserPage () {
		if (currentUserId === user?.id) {
			navigate('/account')
		} else {
			navigate(`/users/${user?.id}`)
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
			<h2 onClick={_ => handleNavigateToUserPage()}>
				{user?.firstName} {user?.lastName}
			</h2>
			<h3>{post && getDateString(`${post?.createdAt}`)}</h3>
			<p>{post?.post}</p>
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
