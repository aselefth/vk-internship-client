import { Outlet } from "react-router-dom";
import { TopBar } from "../../components/TopBar/TopBar";

export function AuthLayout () {
    return (
        <main className='mt-20 max-w-1200 mx-auto'>
            <TopBar />
            <Outlet />
        </main>
    )
}