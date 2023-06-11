import { useGetUserByIdQuery } from "../store/Api/usersSlice";
import { useImageUrl } from "../hooks/useImageUrl";
import { useNavigate } from "react-router-dom";
import { useDeleteMyRequestMutation, useGetIsSubscribedQuery, useSendRequestMutation } from "../store/Api/requestsSlice";

export function UserBio(props: { id: string }) {
   const { data: user } = useGetUserByIdQuery(props.id);
   const { imgUrl } = useImageUrl({
      type: "userId",
      id: props.id,
   });
   const { data } = useGetIsSubscribedQuery(props.id);
   const navigate = useNavigate();
   const [unsub] = useDeleteMyRequestMutation();
   const [sub] = useSendRequestMutation();

   async function handleUnsubscribe(recieverId: string) {
      try {
         await unsub({recieverId});
      } catch (e) {
         console.log(e);
      }
   }

   async function handleSubscribe(recieverId: string) {
      try {
         await sub(recieverId);
      } catch (e) {
         console.log(e);
      }
   }

   return (
      <article
         className="w-full p-4 grid grid-cols-[auto_auto_1fr] gap-4
		border-b-[1px] border-gray-500 last:border-b-0 hover:bg-zinc-950 cursor-pointer"
         onClick={() => navigate(`/${user?.id}/posts`)}
      >
         <div className="w-14 h-14 border-purple-800 border-4 rounded-[50%]">
            {imgUrl ? (
               <img
                  src={imgUrl}
                  alt={user?.firstName}
                  className="w-full h-full object-cover rounded-[50%]"
               />
            ) : (
               <span className="flex items-center justify-center text-xl w-full h-full">
                  {user?.firstName[0]}
                  {user?.lastName[0]}
               </span>
            )}
         </div>
         <div className="flex flex-col gap-2">
            <h2
               onClick={(_) => navigate(`/${user?.id}`)}
               className="cursor-pointer hover:text-gray-300 active:text-gray:300 transition duration-150 text-lg text-white"
            >
               {user?.firstName} {user?.lastName}
            </h2>
            <div className="flex items-center gap-2 font-light">
               <p>{user?.recievedRequests.length} подписчиков</p>
               <span className="w-1 h-1 bg-gray-400 rounded-[50%]"></span>
               <p>{user?.recievedRequests.length} подписок</p>
            </div>
         </div>
         <button
            className="btn btn-primary justify-self-end"
            onClick={(e) => {
               e.stopPropagation();
               if (data?.isSubscribed) {

                  handleUnsubscribe(String(user?.id));
               } else {
                  handleSubscribe(String(user?.id));
               }
            }}
         >
            {data?.isSubscribed ? "Отписаться" : "Подписаться"}
         </button>
      </article>
   );
}
