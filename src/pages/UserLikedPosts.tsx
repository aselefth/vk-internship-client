import { Post } from '../components/Post/Post';
import { PostLoader } from '../components/PostLoader';
import { useGetLikedQuery } from '../store/Api/postsSlice';

export function UserLikedPage() {
	const { data: posts, isLoading } = useGetLikedQuery(undefined);

	console.log(posts)

	console.log(posts);
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
				posts?.map((post) => (
					<Post key={String(post.id)} postId={String(post.id)} />
				))}
		</>
	);
}
