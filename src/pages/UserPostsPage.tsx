import { Post } from '../components/Post/Post';
import { PostLoader } from '../components/PostLoader';
import { useGetUserPostsQuery } from '../store/Api/postsSlice';
import { getSession } from '../utils/getSession';

export function UserPostsPage() {
	const session = getSession();
	const id = session?.id;
	const { data: posts, isLoading } = useGetUserPostsQuery(String(id));

	return (
		<>
			{isLoading && (
				<>
					<PostLoader />
					<PostLoader />
					<PostLoader />
					<PostLoader />
					<PostLoader />
				</>
			)}
			{posts &&
				posts.map((post) => (
					<Post key={String(post.id)} postId={String(post.id)} />
				))}
		</>
	);
}
