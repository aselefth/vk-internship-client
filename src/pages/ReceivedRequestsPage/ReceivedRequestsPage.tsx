import { Loader } from '../../components/Loader/Loader';
import { Request } from '../../components/Request/Request';
import { useGetReceivedRequestsQuery } from '../../store/Api/requestsSlice';
import styles from './RequestsPage.module.scss';

export function ReceivedRequestsPage() {
	const { data: requests, isLoading } = useGetReceivedRequestsQuery(undefined);

	return (
		<div className={styles.pageWrapper}>
			{isLoading && <Loader />}
			<h1>Запросы</h1>
			{requests?.recievedRequests.map((req) => (
				<Request request={req} key={req.id} />
			))}
		</div>
	);
}
