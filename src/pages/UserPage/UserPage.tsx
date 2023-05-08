import { useParams } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { useGetUserByIdQuery } from '../../store/Api/usersSlice';
import { useGetUserPostsQuery } from '../../store/Api/postsSlice';
import { Post } from '../../components/Post/Post';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../hooks/redux';
import { useGetSentRequestsQuery, useSendRequestMutation } from '../../store/Api/requestsSlice';
import { useState, useEffect } from 'react';

export function UserPage () {

    const {id} = useParams();
    const {data: user} = useGetUserByIdQuery(String(id));
    const {data: posts} = useGetUserPostsQuery(String(id));
    const {data: sentRequests} = useGetSentRequestsQuery(undefined);
    const currentUser = useAppSelector(state => state.userSlice);
    const [sendRequest] = useSendRequestMutation();
    const [isRequest, setIsRequest] = useState(false);

    useEffect(() => {
        if (sentRequests) {
            const myReq = sentRequests.sentRequests.find(usr => usr.id === user?.id);
            if (myReq) {
                setIsRequest(true);
            } else {
                setIsRequest(false);
            }
        }
    }, [sentRequests])

    async function handleSendRequest (receiverId: string) {
        try {
            await sendRequest(receiverId);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles.accountPage}>
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
                    <button onClick={_ => handleSendRequest(String(user?.id))} disabled={isRequest}>
                        <span>{isRequest ? 'запрос отправлен' : 'отправить запрос'}</span>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
			</section>
			{posts &&
				posts.map((post) => <Post key={post.id} postId={post?.id} />)}
		</div>
    )
}