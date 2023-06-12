import { useEffect, useState } from "react";

interface UseImageUrlProps {
   type: "userId" | "postId";
   id: string | undefined;
   skip?: boolean
}

export function useImageUrl(props: UseImageUrlProps) {
   const [imgUrl, setImgUrl] = useState("");
   const skip = props.skip ?? false;
   

   useEffect(() => {
      async function getImg(body: UseImageUrlProps) {
         const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/files?${body.type}=${body.id}`
         );
         const data = new Uint8Array(await res.arrayBuffer());
         const blob = new Blob([data], { type: "image/png" });
         const img = window.webkitURL.createObjectURL(blob);
         setImgUrl(img);
      }

      if (props.id && !skip) {
         getImg(props);
      } else {
         setImgUrl('');
      }
   }, [props]);

   return {imgUrl, setImgUrl};
}
