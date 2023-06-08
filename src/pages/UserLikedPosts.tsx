import { useParams } from "react-router-dom";
import { Post } from "../components/Post/Post";
import { PostLoader } from "../components/PostLoader";
import { useGetLikedQuery } from "../store/Api/postsSlice";

export function UserLikedPage() {
   const { id } = useParams<{ id: string }>();
   const { data: likedPosts, isLoading } = useGetLikedQuery(String(id));

   return (
      <>
         {isLoading && (
            <>
               <PostLoader />
               <PostLoader />
               <PostLoader />
               <PostLoader />
               <PostLoader />
            </>
         )}
         {likedPosts &&
            likedPosts?.map((post) => (
               <Post
                  key={String(post.id) + Math.random()}
                  postId={String(post.id)}
               />
            ))}
      </>
   );
}
