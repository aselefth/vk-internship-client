import { useDeleteMyRequestMutation, useSendRequestMutation } from "../store/Api/requestsSlice";

export function unsubscribe () {
   const [unsub] = useDeleteMyRequestMutation();

   async function handleUnsubscribe(recieverId: string) {
      try {
         await unsub({recieverId});
      } catch (e) {
         console.log(e);
      }
   }

   return handleUnsubscribe;
}

export function subscribe () {
   const [sub] = useSendRequestMutation();

   return async function (recieverId: string) {
      try {
         await sub(recieverId);
      } catch (e) {
         console.log(e);
      }
   }
}