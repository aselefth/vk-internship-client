import styles from './FriendsPage.module.scss';
import { useGetFriendsQuery } from '../../store/Api/friendsSlice';
import { Friend } from '../../components/Friend/Friend';
import { Loader } from '../../components/Loader/Loader';

export function FriendsPage() {
	const { data: friends, isLoading } = useGetFriendsQuery(undefined);

	return (
		<div className={styles.pageWrapper}>
			{isLoading && <Loader />}
			<h1>Друзья</h1>
			{friends &&
				friends.map((friend) => (
					<Friend key={friend.id} friend={friend} />
				))}
		</div>
	);
}
