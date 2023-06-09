import { useParams } from "react-router-dom";
import { useGetSubsQuery } from "../store/Api/usersSlice";
import { UserBio } from "../components/UserBio";

export function SubscribersPage() {
   const { id } = useParams<{ id: string }>();
   const { data } = useGetSubsQuery(String(id));

   return (
      <div className="flex flex-col items-center w-full min-h-full">
         <h1
            className="sticky top-0 left-0 w-full flex items-center backdrop-filter backdrop-blur-sm bg-opacity-80
      justify-start p-4 bg-black text-white z-50 text-lg font-bold"
         >
            Подписчики
         </h1>
         {data?.subs.length ? (
            data?.subs.map((sub) => <UserBio key={sub.id} id={sub.id} />)
         ) : (
            <h1 className="text-3xl">Нет подписчиков</h1>
         )}
      </div>
   );
}
