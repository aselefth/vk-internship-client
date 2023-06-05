import { useParams } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { useGetUserByIdQuery } from '../../store/Api/usersSlice';
import { useGetUserPostsQuery } from '../../store/Api/postsSlice';
import { Post } from '../../components/Post/Post';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	useGetSentRequestsQuery,
	useSendRequestMutation
} from '../../store/Api/requestsSlice';
import { useGetFriendsQuery } from '../../store/Api/friendsSlice';
import { Loader } from '../../components/Loader/Loader';

export function UserPage() {
	const { id } = useParams();
	const { data: user, isLoading } = useGetUserByIdQuery(String(id));
	const { data: posts } = useGetUserPostsQuery(String(id));
	const { data: sentRequests } = useGetSentRequestsQuery(undefined);
	const { data: friends } = useGetFriendsQuery(undefined);
	const [sendRequest] = useSendRequestMutation();

	function getIsFriend (): boolean {
		if (!friends || !user) {
			return false;
		}
		const friend = friends.find(usr => usr.id === user.id);

		return friend ? true : false;
	}

	function getIsRequestSent (): boolean {
		if (!user || !sentRequests) {
			return false;
		}
		const {sentRequests: requests} = sentRequests;
		const req = requests.find(usr => usr.id === user.id);

		return req ? true : false;
	}

	async function handleSendRequest(receiverId: string) {
		try {
			await sendRequest(receiverId);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className={styles.accountPage}>
            {isLoading && <Loader />}
			<section className={styles.userInfo}>
				<h1>
					{user?.firstName} {user?.lastName}
				</h1>
				<table>
					<tbody>
						<tr>
							<td>Почта</td>
							<td>{user?.email}</td>
						</tr>
						<tr>
							<td>Возраст</td>
							<td>{user?.age} лет</td>
						</tr>
						<tr>
							<td>Город</td>
							<td>{user?.city}</td>
						</tr>
						<tr>
							<td>Университет</td>
							<td>{user?.university}</td>
						</tr>
					</tbody>
				</table>
				<div className={styles.requestsSection}>
					{!getIsFriend() && (
						<button
							onClick={() => handleSendRequest(String(user?.id))}
							disabled={getIsRequestSent()}
						>
							<span>
								{getIsRequestSent()
									? 'запрос отправлен'
									: 'отправить запрос'}
							</span>
							<FontAwesomeIcon icon={faPaperPlane} />
						</button>
					)}
				</div>
			</section>
			{posts &&
				posts.map((post) => <Post key={post.id} postId={post?.id} />)}
		</div>
	);
}
