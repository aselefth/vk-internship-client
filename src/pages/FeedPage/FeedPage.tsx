import { Post } from '../../components/Post/Post';
import { useGetAllPostsQuery } from '../../store/Api/postsSlice';
import styles from './FeedPage.module.scss';

export function FeedPage() {
	const { data: posts, isLoading } = useGetAllPostsQuery(undefined);

	return (
		<div className={styles.postsWrapper}>
			{posts &&
				posts.map((post) => (
					<Post key={String(post.id)} postId={String(post.id)} />
				))}
		</div>
	);
}