import { CreatePostModal } from '../../components/CreatePostModal/CreatePostModal';
import { Loader } from '../../components/Loader/Loader';
import { Post } from '../../components/Post/Post';
import { useAppSelector } from '../../hooks/redux';
import { useGetUserPostsQuery } from '../../store/Api/postsSlice';
import styles from './AccountPage.module.scss';

export function AccountPage() {
	const id = useAppSelector((state) => state.userSlice.id);
	const currentUser = useAppSelector((state) => state.userSlice);
	const { data: posts, isLoading } = useGetUserPostsQuery(id);

	console.log(currentUser);

	return (
		<div className={styles.accountPage}>
			{isLoading && <Loader />}
			<section className={styles.userInfo}>
				<h1>
					{currentUser.firstName} {currentUser.lastName}
				</h1>
				<table>
					<tbody>
						<tr>
							<td>Почта</td>
							<td>{currentUser.email}</td>
						</tr>
						<tr>
							<td>Возраст</td>
							<td>{currentUser.age} лет</td>
						</tr>
						<tr>
							<td>Город</td>
							<td>{currentUser.city}</td>
						</tr>
						<tr>
							<td>Университет</td>
							<td>{currentUser.university}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<CreatePostModal />
			{posts &&
				posts.map((post) => <Post key={post.id} postId={post?.id} />)}
		</div>
	);
}
