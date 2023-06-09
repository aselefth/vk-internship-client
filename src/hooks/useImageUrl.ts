import { useEffect, useState } from "react";

interface UseImageUrlProps {
   type: "userId" | "postId";
   id: string | undefined;
   filePath: string | null | undefined;
}

export function useImageUrl(props: UseImageUrlProps) {
   const [imgUrl, setImgUrl] = useState("");

   useEffect(() => {
      async function getImg(id: string) {
         const res = await fetch(
            `http://localhost:3001/api/files?${props.type}=${id}`
         );
         const data = new Uint8Array(await res.arrayBuffer());
         const blob = new Blob([data], { type: "image/png" });
         const img = window.webkitURL.createObjectURL(blob);
         setImgUrl(img);
      }

      if (props.id && props.filePath) {
         getImg(props.id);
      } else {
         setImgUrl('');
      }
   }, [props.id]);

   return {imgUrl, setImgUrl};
}
