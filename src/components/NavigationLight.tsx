import { faVk } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export function NavigationLight() {
   const navigate = useNavigate();
   return (
      <aside className="sm:flex hidden flex-col items-end mx-auto pt-4 w-full pr-2">
         <nav className="flex flex-col items-start fixed">
            <div
               className={`text-3xl text-white flex items-center gap-4 px-4 py-2 hover:bg-purple-900 
						transition duration-[.2s] rounded-[1000px] hover:cursor-pointer`}
               onClick={() => navigate("/signin")}
            >
               <FontAwesomeIcon icon={faVk} />
            </div>
         </nav>
      </aside>
   );
}
