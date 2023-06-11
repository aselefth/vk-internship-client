interface UserCoverProps {
   lastName: string | undefined;
   firstName: string | undefined;
   imgUrl: string | undefined;
}

export function UserCover({ firstName, lastName, imgUrl }: UserCoverProps) {
   return (
      <div className="w-14 h-14 rounded-[50%] bg-black flex items-center justify-center border-4 border-purple-700">
         {imgUrl ? (
            <img src={imgUrl} className="w-full h-full object-cover rounded-[50%]" />
         ) : (
            <span>
               {String(firstName)[0]}{String(lastName)[0]}
            </span>
         )}
      </div>
   );
}
