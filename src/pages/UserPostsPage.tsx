import { useParams } from 'react-router-dom';
import { Post } from '../components/Post/Post';
import { PostLoader } from '../components/PostLoader';
import { useGetUserPostsQuery } from '../store/Api/postsSlice';

export function UserPostsPage() {
	const {id} = useParams<{id: string}>();
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
