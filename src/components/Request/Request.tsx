import { UserType } from '../../types/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
	useAcceptRequestMutation,
	useDeclineRequestMutation
} from '../../store/Api/requestsSlice';
import styles from './Request.module.scss';
import { useNavigate } from 'react-router-dom';

interface RequestProps {
	request: UserType;
}

export function Request({ request }: RequestProps) {

    const [acceptRequest] = useAcceptRequestMutation();
    const [declineRequest] = useDeclineRequestMutation();
    const navigate = useNavigate();

    async function handleAcceptRequest () {
        try {
            await acceptRequest(request.id);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleDeclineRequest () {
        try {
            await declineRequest(request.id);
        } catch (e) {
            console.error(e);
        }
    }

	return (
		<div className={styles.request}>
			<h2 onClick={() => navigate(`/users/${request.id}`)}>
				{request.firstName} {request.lastName}
			</h2>
			<div className={styles.buttons}>
				<button onClick={handleAcceptRequest}>
					<FontAwesomeIcon icon={faCheck} />
				</button>
				<button onClick={handleDeclineRequest}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
		</div>
	);
}
