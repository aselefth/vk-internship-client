import { Post } from "../components/Post/Post";
import { PostLoader } from "../components/PostLoader";
import { useGetSubscribedPostsQuery } from "../store/Api/postsSlice";

export function SubsFeedPage() {
   const { data, isLoading } = useGetSubscribedPostsQuery(undefined);
	console.log(data);
   return (
      <div className="flex flex-col items-center w-full min-h-full">
         <h1
            className="sticky top-0 left-0 w-full flex items-center backdrop-filter backdrop-blur-sm bg-opacity-80
           justify-start p-4 bg-black text-white z-50 text-lg font-bold"
         >
            Подписки
         </h1>
         {isLoading && (
            <>
               <PostLoader />
               <PostLoader />
               <PostLoader />
               <PostLoader />
            </>
         )}

         {data?.posts?.map((post) => (
            <Post key={post?.id} postId={post.id} />
         ))}
      </div>
   );
}
