import { Outlet } from "react-router-dom";
import { TopBar } from "../../components/TopBar/TopBar";

export function AuthLayout () {
    return (
        <main style={{position: 'relative'}}>
            <TopBar />
            <Outlet />
        </main>
    )
}