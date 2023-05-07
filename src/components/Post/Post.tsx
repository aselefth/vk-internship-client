import {
	useGetPostByIdQuery,
	useLikePostMutation
} from '../../store/Api/postsSlice';
import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { useGetMeQuery } from '../../store/Api/usersSlice';
import { useEffect, useState } from 'react';

interface PostProps {
	postId: string;
}

export function Post({ postId }: PostProps) {
	const { data: post, isLoading } = useGetPostByIdQuery(postId);
	const { data: currentUser } = useGetMeQuery(undefined);
	const [likePost] = useLikePostMutation();
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        if (post) {
            const isLike = post?.likes?.find(like => like?.userId === currentUser?.id);
            if (isLike) {
                setHasLiked(true);
            }
        }
    }, [post, currentUser])

	async function handleToggleLike(body: { postId: string; userId: string }) {
		try {
			await likePost(body);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className={styles.post}>
			<h2>@{post?.userId}</h2>
			<h1>{post?.title}</h1>
			<p>{post?.post}</p>
			<div className={styles.buttonsSection}>
				<FontAwesomeIcon
					icon={faHeart}
                    color={hasLiked ? 'var(--mainBlue)' : 'black'}
					onClick={(_) =>
						handleToggleLike({
							postId: String(post?.id),
							userId: String(currentUser?.id)
						})
					}
				/>
				<span>{post?.likes?.length}</span>
			</div>
		</div>
	);
}
