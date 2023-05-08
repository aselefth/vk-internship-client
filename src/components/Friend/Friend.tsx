import { UserType } from "../../types/user";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Friend.module.scss';
import { useDeleteFriendMutation } from "../../store/Api/friendsSlice";
import { useNavigate } from "react-router-dom";

interface FriendProps {
    friend: UserType
}

export function Friend ({friend}: FriendProps) {

    const [deleteFriend] = useDeleteFriendMutation();
    const navigate = useNavigate();

    async function handleDeleteFriend() {
        try {
            await deleteFriend(friend.id);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles.friend}>
            <h2 onClick={() => navigate(`/users/${friend.id}`)}>{friend.firstName} {friend.lastName}</h2>
            <div className={styles.buttons}>
                <button onClick={handleDeleteFriend}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}