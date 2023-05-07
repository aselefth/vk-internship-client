import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './TopBar.module.scss';
import { useNavigate } from "react-router-dom";

export function TopBar () {

    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <FontAwesomeIcon icon={faHome} onClick={_ => {navigate('/feed')}}/>
        </nav>
    )
}