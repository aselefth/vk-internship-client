import {
   faDoorOpen,
   faPassport,
   faNewspaper,
   faSignsPost
} from "@fortawesome/free-solid-svg-icons";
import { faVk } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLazySignOutQuery } from "../store/Api/authSlice";
import { getSession } from "../utils/getSession";

export function Navigation() {
   const session = getSession();
   const navigate = useNavigate();
   const [signOut] = useLazySignOutQuery();
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
         navigate("/signin");
      } catch (e) {
         console.error(e);
      }
   }

   return (
      <aside className="flex lg:flex-col items-end mx-auto pt-4 w-full pr-2 lg:relative fixed bottom-0 z-50">
         <nav className="flex lg:flex-col lg:items-start items-center justify-around fixed 
         lg:bg-inherit bg-primary w-full lg:w-auto py-2">
            <div
               className={`text-2xl text-white flex items-center gap-4 px-4 py-2 hover:bg-purple-900 
						transition duration-[.2s] rounded-[1000px] hover:cursor-pointer`}
               onClick={() => navigate("/feed")}
            >
               <FontAwesomeIcon icon={faVk} />
            </div>
            {session && routes.map((route) => (
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
                  <FontAwesomeIcon icon={route.icon} className="text-2xl" />
                  <span className="hidden lg:block">{route.name}</span>
               </div>
            ))}
         </nav>
      </aside>
   );
}
