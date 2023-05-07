import { Outlet } from "react-router-dom";
import { TopBar } from "../../components/TopBar/TopBar";
import styles from './AuthLayout.module.scss';

export function AuthLayout () {
    return (
        <main className={styles.main}>
            <TopBar />
            <Outlet />
        </main>
    )
}