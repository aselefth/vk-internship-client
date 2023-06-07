import { Loader } from '../../components/Loader/Loader';
import { Post } from '../../components/Post/Post';
import { PostLoader } from '../../components/PostLoader';
import { useGetAllPostsQuery } from '../../store/Api/postsSlice';

export function FeedPage() {
	const { data: posts, isLoading } = useGetAllPostsQuery(undefined);

	return (
		<div className='flex flex-col items-center gap-0 w-full min-h-full'>
			<h1
				className='sticky top-0 left-0 w-full flex items-center backdrop-filter backdrop-blur-sm bg-opacity-80
			justify-start p-4 bg-black text-white z-50 text-lg font-bold'
			>
				Лента
			</h1>
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
		</div>
	);
}
