import { Outlet } from "react-router-dom";
import { TopBar } from "../../components/TopBar/TopBar";
import { NavigationLight } from "../../components/Navigation/NavigationLight";

export function AuthLayout () {
    return (
        <main className='max-w-1200 mx-auto grid lg:grid-cols-[350px_1fr_350px]'>
			<NavigationLight />
			<div className='w-full border-gray-600 border-r-[1px] border-l-[1px] relative min-h-[100vh] pb-20'>
				<Outlet />
			</div>
		</main>
    )
}