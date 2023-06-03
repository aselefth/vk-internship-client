import { CreatePostModal } from '../../components/CreatePostModal/CreatePostModal';
import { Loader } from '../../components/Loader/Loader';
import { Post } from '../../components/Post/Post';
import { useAppSelector } from '../../hooks/redux';
import { useGetUserPostsQuery } from '../../store/Api/postsSlice';
import { useGetMeQuery } from '../../store/Api/usersSlice';
import styles from './AccountPage.module.scss';

export function AccountPage() {
	const id = useAppSelector((state) => state.userSlice.id);
	const {data: currentUser} = useGetMeQuery(undefined);
	const { data: posts, isLoading } = useGetUserPostsQuery(id);

	return (
		<div className={styles.accountPage}>
			{isLoading && <Loader />}
			<section className={styles.userInfo}>
				<h1>
					{currentUser?.firstName} {currentUser?.lastName}
				</h1>
				<table>
					<tbody>
						<tr>
							<td>Почта</td>
							<td>{currentUser?.email}</td>
						</tr>
						<tr>
							<td>Возраст</td>
							<td>{currentUser?.age} лет</td>
						</tr>
						<tr>
							<td>Город</td>
							<td>{currentUser?.city}</td>
						</tr>
						<tr>
							<td>Университет</td>
							<td>{currentUser?.university}</td>
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
