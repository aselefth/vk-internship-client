import {
   SubmitHandler,
   UseFormHandleSubmit,
   UseFormRegister
} from "react-hook-form";
import { SignInType } from "../../types/authTypes";

interface FormProps {
   register: UseFormRegister<SignInType>;
   handleSubmit: UseFormHandleSubmit<SignInType>;
   onSubmit: SubmitHandler<SignInType>;
}

export function UISignInForm({ register, handleSubmit, onSubmit }: FormProps) {
   return (
      <form
         className="flex flex-col gap-4 items-center w-full pt-2 lg:pt-0"
         onSubmit={handleSubmit(onSubmit)}
      >
         <h1 className="text-xl font-bold">Вход</h1>
         <div className="flex flex-col gap-2">
            <input
               placeholder="почта"
               className="input input-primary"
               type="text"
               {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
               })}
            />
            <input
               placeholder="пароль"
               className="input input-primary"
               type="password"
               {...register("password", {
                  required: true,
                  minLength: 3
               })}
            />
         </div>

         <div className="flex flex-col gap-4 items-center">
            <button type="submit" className="btn btn-primary">
               Войти в аккаунт
            </button>
            <p className="flex items-center">
               <span>Нет аккаунта?</span>
               <a href="/auth/signup" className="btn-link btn">
                  Зарегистрироваться
               </a>
            </p>
         </div>
      </form>
   );
}
