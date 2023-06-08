import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUserByIdQuery } from "../../store/Api/usersSlice";
import {
   faPassport,
   faLocationDot,
   faUniversity,
   faPen
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAgeString } from "../../utils/getAgeString";
import { AccountLayout } from "./AccountLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getSession } from "../../utils/getSession";

export function AccountPage() {
   const { id } = useParams<{ id: string }>();
   const session = getSession();
   const { data: me } = useGetUserByIdQuery(String(id));
   const [imgUrl, setImgUrl] = useState("");
	const navigate = useNavigate();

   useEffect(() => {
      async function getImg(userId: string) {
         const res = await fetch(
            "http://localhost:3001/api/files?userId=" + userId
         );
         const data = new Uint8Array(await res.arrayBuffer());
         const blob = new Blob([data], { type: "image/png" });
         const img = window.webkitURL.createObjectURL(blob);
         setImgUrl(img);
      }
      if (me && me.filePath) {
         getImg(me.id);
      }
   }, [me]);

   return (
      <div className="flex flex-col items-center w-full min-h-full">
         <h1
            className="sticky top-0 left-0 w-full flex items-center backdrop-filter backdrop-blur-sm bg-opacity-80
			justify-start p-4 bg-black text-white z-50 text-lg font-bold"
         >
            {me?.firstName} {me?.lastName}
         </h1>
         <div className="flex flex-col items-center w-full gap-2">
            <div className="w-full h-40 bg-gradient-to-t from-gray-700"></div>
            <div className="p-4 w-full flex flex-col text-white gap-2 relative">
               <div className="w-32 h-32 rounded-[50%] border-black border-4 absolute left-4 top-[-4rem]">
                  {imgUrl ? (
                     <img
                        src={imgUrl}
                        className="w-full h-full rounded-[50%] object-cover"
                     />
                  ) : (
                     <span className="text-lg w-full h-full flex items-center justify-center rounded-[50%] bg-purple-800">
                        {me?.firstName[0]}
                        {me?.lastName[0]}
                     </span>
                  )}
               </div>
               <div className="flex items-center gap-4 justify-end">
                  {id === session?.id ? (
                     <button className="btn btn-primary" onClick={() => navigate('/update')}>
                        <FontAwesomeIcon icon={faPen} />{" "}
                        <span>Редактировать</span>
                     </button>
                  ) : (
                     <button className="btn btn-primary">Подписаться</button>
                  )}
               </div>
               <p className="text-xl font-bold">
                  {me?.firstName} {me?.lastName}
               </p>
               <article className="text-gray-300 font-light flex items-center gap-4 flex-wrap">
                  <p className="flex items-center gap-1">
                     <FontAwesomeIcon icon={faLocationDot} />
                     <span>{me?.city}</span>
                  </p>
                  <p className="flex items-center gap-1">
                     <FontAwesomeIcon icon={faUniversity} />
                     <span>{me?.university}</span>
                  </p>
                  <p className="flex items-center gap-1">
                     <FontAwesomeIcon icon={faPassport} />
                     <span>{getAgeString(me?.age)}</span>
                  </p>
               </article>
               <article className="text-gray-300 font-light flex items-center gap-4 flex-wrap">
                  <p>
                     <span className="font-bold">
                        {me?.recievedRequests.length}
                     </span>{" "}
                     подписчиков
                  </p>
                  <p>
                     <span className="font-bold">
                        {me?.sentRequests.length}
                     </span>{" "}
                     подписок
                  </p>
               </article>
            </div>
            <AccountLayout userId={String(id)} />
         </div>
      </div>
   );
}
