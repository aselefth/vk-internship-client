import {
   faDoorOpen,
   faPassport,
   faNewspaper,
   faSignsPost
} from "@fortawesome/free-solid-svg-icons";
import { faVk } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLazySignOutQuery } from "../../store/Api/authSlice";
import { getSession } from "../../utils/getSession";

export function Navigation() {
   const session = getSession();
   const navigate = useNavigate();
   const [signOut] = useLazySignOutQuery();
   if (!session) {
      navigate("/auth/signin");
   }
   const routes = [
      {
         path: `${session?.id}/posts`,
         name: "Моя страница",
         icon: faPassport
      },
      { path: "feed", name: "Лента", icon: faNewspaper },
      { path: "subscribed", name: "Подписки", icon: faSignsPost },
      { path: "signout", name: "Выход", icon: faDoorOpen }
   ];

   async function handleSignOut() {
      try {
         await signOut(undefined);
         navigate("/auth/signin");
      } catch (e) {
         console.error(e);
      }
   }

   return (
      <aside className="flex flex-col items-end mx-auto pt-4 w-full pr-2">
         <nav className="flex flex-col items-start fixed">
            <div
               className={`text-2xl text-white flex items-center gap-4 px-4 py-2 hover:bg-purple-900 
						transition duration-[.2s] rounded-[1000px] hover:cursor-pointer`}
               onClick={() => navigate("/feed")}
            >
               <FontAwesomeIcon icon={faVk} />
            </div>
            {routes.map((route) => (
               <div
                  key={route.path}
                  className={`text-lg text-white flex items-center gap-4 px-4 py-2 hover:bg-purple-900 
						transition duration-[.2s] rounded-[1000px] hover:cursor-pointer`}
                  onClick={
                     route.path === "signout"
                        ? handleSignOut
                        : () => navigate(`/${route.path}`)
                  }
               >
                  <FontAwesomeIcon icon={route.icon} className="text-2xl"/>
                  <span>{route.name}</span>
               </div>
            ))}
         </nav>
      </aside>
   );
}
