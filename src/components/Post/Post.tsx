import {
   useGetPostByIdQuery,
   useLikePostMutation
} from "../../store/Api/postsSlice";
import { useGetUserByIdQuery } from "../../store/Api/usersSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostUI } from "./PostUI";
import { getSession } from "../../utils/getSession";

interface PostProps {
   postId: string;
}

export function Post({ postId }: PostProps) {
   const session = getSession();
   const { data: post } = useGetPostByIdQuery(postId);
   const [likePost] = useLikePostMutation();
   const { data: user } = useGetUserByIdQuery(String(post?.userId), {
      skip: !session?.id
   });
   const navigate = useNavigate();
   const [imgUrl, setImgUrl] = useState("");
   const [usrImg, setUsrImg] = useState("");

   useEffect(() => {
      async function getImg(userId: string) {
         const res = await fetch(
            import.meta.env.VITE_API_URL + "/api/files?userId=" + userId
         );
         const data = new Uint8Array(await res.arrayBuffer());
         const blob = new Blob([data], { type: "image/png" });
         const img = window.webkitURL.createObjectURL(blob);
         setUsrImg(img);
      }
      if (user && user.filePath) {
         getImg(user.id);
      }
   }, [user]);

   useEffect(() => {
      async function getImg(postId: string) {
         const res = await fetch(
            import.meta.env.VITE_API_URL + "/api/files?postId=" + postId
         );
         const data = new Uint8Array(await res.arrayBuffer());
         const blob = new Blob([data], { type: "image/png" });
         const img = window.webkitURL.createObjectURL(blob);
         setImgUrl(img);
      }
      if (post && post.filePath) {
         getImg(post.id);
      }
   }, [post]);

   function getIsLiked(): boolean {
      const postLike = post?.likedBy.find((usr) => usr.id === session?.id);
      return postLike ? true : false;
   }

   function handleNavigateToUserPage() {
      navigate("/" + user?.id + "/posts");
   }

   async function handleToggleLike(body: { postId: string }) {
      try {
         await likePost(body);
      } catch (e) {
         console.error(e);
      }
   }

   return (
      <PostUI
         handleNavigateToUserPage={handleNavigateToUserPage}
         post={post}
         user={user}
         handleToggleLike={handleToggleLike}
         getIsLiked={getIsLiked}
         imgUrl={imgUrl}
         usrImg={usrImg}
      />
   );
}
