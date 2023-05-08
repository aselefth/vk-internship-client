import styles from './FriendsPage.module.scss';
import { useGetFriendsQuery } from '../../store/Api/friendsSlice';
import { Friend } from '../../components/Friend/Friend';

export function FriendsPage() {
	const { data: friends } = useGetFriendsQuery(undefined);

	return (
		<div className={styles.pageWrapper}>
			<h1>Друзья</h1>
			{friends &&
				friends.map((friend) => (
					<Friend key={friend.id} friend={friend} />
				))}
		</div>
	);
}
