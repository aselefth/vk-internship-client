import { Request } from '../../components/Request/Request';
import { useGetReceivedRequestsQuery } from '../../store/Api/requestsSlice';
import styles from './RequestsPage.module.scss';

export function ReceivedRequestsPage() {
	const { data: requests } = useGetReceivedRequestsQuery(undefined);
	console.log(requests);

	return (
		<div className={styles.pageWrapper}>
			<h1>Запросы</h1>
			{requests?.recievedRequests.map((req) => (
				<Request request={req} key={req.id} />
			))}
		</div>
	);
}
