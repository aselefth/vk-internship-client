import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreatePostModal } from '../../components/CreatePostModal/CreatePostModal';
import { Loader } from '../../components/Loader/Loader';
import { Post } from '../../components/Post/Post';
import { useAppSelector } from '../../hooks/redux';
import { useGetUserPostsQuery } from '../../store/Api/postsSlice';
import { useGetMeQuery } from '../../store/Api/usersSlice';
import styles from './AccountPage.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function AccountPage() {
	const id = useAppSelector((state) => state.userSlice.id);
	const { data: currentUser } = useGetMeQuery(undefined);
	const { data: posts, isLoading } = useGetUserPostsQuery(id);
	const navigate = useNavigate();
	const [imgUrl, setImgUrl] = useState('');

	useEffect(() => {
		async function getImg(userId: string) {
			const res = await fetch(
				'http://localhost:3001/api/files?userId=' + userId
			);
			const data = new Uint8Array(await res.arrayBuffer());
			const blob = new Blob([data], { type: 'image/png' });
			const img = window.webkitURL.createObjectURL(blob);
			setImgUrl(img);
		}
		if (currentUser && currentUser.filePath) {
			getImg(currentUser.id);
		}
	}, [currentUser]);

	return (
		<div className={styles.accountPage}>
			{isLoading && <Loader />}
			<section className={styles.userInfo}>
				{imgUrl && <img src={imgUrl} alt={currentUser?.firstName as string} />}
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
				<button
					className={styles.linkBtn}
					onClick={() => navigate('/account/update')}
				>
					<span>Изменить</span>
					<FontAwesomeIcon icon={faPen} />
				</button>
			</section>

			<CreatePostModal />
			{posts &&
				posts.map((post) => <Post key={post.id} postId={post?.id} />)}
		</div>
	);
}
