import { useState } from "react";
import { useCreatePostMutation } from "../../store/Api/postsSlice";
import { useImageUrl } from "../../hooks/useImageUrl";
import { useGetMeQuery } from "../../store/Api/usersSlice";
import { UserCover } from "../UserCover";
import { getSession } from "../../utils/getSession";

type PostData = {
   post: string;
   file: File | null;
};

export function CreatePostModal() {
   const [postData, setPostData] = useState<PostData>({
      post: "",
      file: null
   });
   const [addPost] = useCreatePostMutation();
   const session = getSession();
   const { imgUrl } = useImageUrl({
      type: "userId",
      id: session?.id
   });
   const {data: me} = useGetMeQuery(undefined);

   async function handleCreatePost(postBody: {
      post: string;
      file: null | File;
   }) {
      try {
         const { id: postId } = await addPost({ post: postBody.post }).unwrap();
         if (postBody.file === null) {
            setPostData({ post: "", file: null });
            return;
         } else {
            const response = await fetch(
               "http://localhost:3001/api/files/posts",
               {
                  method: "POST",
                  body: (() => {
                     const form = new FormData();
                     form.append("file", postData?.file!);
                     form.append("postId", postId);
                     return form;
                  })()
               }
            );

            const res: { ok: boolean } = await response.json();

            if (res.ok) {
               setPostData({ file: null, post: "" });
            } else {
               console.log("FILE UPLOAD ERROR");
            }

            setPostData({ post: "", file: null });
         }
      } catch (e) {
         console.error(e);
      }
   }

   // async function handleUploadFile({
   // 	postId,
   // 	file
   // }: {
   // 	postId: string;
   // 	file: File;
   // }): Promise<boolean> {
   // 	try {
   // 		const { ok } = await addFile({ postId, file }).unwrap();
   // 		if (ok) {
   // 			return true;
   // 		}
   // 	} catch (e) {
   // 		console.log(e);
   // 		return false;
   // 	}
   // 	return false;
   // }

   return (
      <form
         className="flex w-full p-4 gap-4 justify-between border-b-[1px] border-gray-500"
         onSubmit={(e) => {
            e.preventDefault();
            handleCreatePost(postData);
         }}
      >
         <div className="flex gap-4 w-full">
            <UserCover
               imgUrl={imgUrl}
               firstName={me?.firstName}
               lastName={me?.lastName}
            />
            <div className="flex flex-col gap-4 w-full">
               <textarea
                  placeholder="Есть, чем поделиться?"
                  name="post"
                  value={postData.post}
                  onChange={(e) =>
                     setPostData({ ...postData, post: e.target.value })
                  }
                  className="textarea textarea-primary resize-none text-base w-full min-h-[8rem] overflow-y-auto"
               />
               <input
                  type="file"
                  onChange={(e) =>
                     setPostData((prev) => ({
                        ...prev,
                        file: e?.target?.files![0]
                     }))
                  }
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
               />
            </div>
         </div>
         <button type="submit" className="btn btn-primary self-end">
            Опубликовать
         </button>
      </form>
   );
}
