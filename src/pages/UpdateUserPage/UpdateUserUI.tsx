import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { UpdateUserDto } from "./UpdateUserPage";
import { Dispatch } from "react";

interface UIProps {
   handleUpdateMe: () => Promise<void>;
   data: UpdateUserDto;
   setData: Dispatch<React.SetStateAction<UpdateUserDto>>;
   setFile: Dispatch<React.SetStateAction<File | null>>;
	id: string | undefined;
}

export function UpdateUserUI(props: UIProps) {
   const navigate = useNavigate();
   return (
      <section className="flex flex-col items-center gap-4 w-full min-h-full">
         <h1
            className="sticky top-0 left-0 w-full flex items-center backdrop-filter backdrop-blur-sm bg-opacity-80
			justify-start p-4 bg-black text-white z-50 text-lg font-bold"
         >
            Изменить данные
         </h1>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               props.handleUpdateMe();
            }}
            className="flex flex-col gap-4 items-center w-full text-white"
         >
            <input
               type="text"
               className="input input-bordered input-primary max-w-[330px] min-w-[300px] w-1/3"
               placeholder="Имя"
               value={props.data.firstName}
               onChange={(e) =>
                  props.setData((prev) => ({
                     ...prev,
                     firstName: e.target.value
                  }))
               }
            />
            <input
               type="text"
               className="input input-bordered input-primary max-w-[330px] min-w-[300px] w-1/3"
               placeholder="Фамилия"
               value={props.data.lastName}
               onChange={(e) =>
                  props.setData((prev) => ({
                     ...prev,
                     lastName: e.target.value
                  }))
               }
            />
            <input
               type="text"
               className="input input-bordered input-primary max-w-[330px] min-w-[300px] w-1/3"
               placeholder="Почта"
               value={props.data.email}
               onChange={(e) =>
                  props.setData((prev) => ({
                     ...prev,
                     email: e.target.value
                  }))
               }
            />
            <input
               type="text"
               className="input input-bordered input-primary max-w-[330px] min-w-[300px] w-1/3"
               placeholder="Город"
               value={props.data.city}
               onChange={(e) =>
                  props.setData((prev) => ({
                     ...prev,
                     city: e.target.value
                  }))
               }
            />
            <input
               type="text"
               className="input input-bordered input-primary max-w-[330px] min-w-[300px] w-1/3"
               placeholder="Университет"
               value={props.data.university}
               onChange={(e) =>
                  props.setData((prev) => ({
                     ...prev,
                     university: e.target.value
                  }))
               }
            />
            <input
               type="number"
               className="input input-bordered input-primary max-w-[330px] min-w-[300px] w-1/3"
               placeholder="Возраст"
               value={props.data.age}
               onChange={(e) =>
                  props.setData((prev) => ({
                     ...prev,
                     age: Number(e.target.value)
                  }))
               }
            />
            <input
               type="file"
               className="file-input file-input-bordered file-input-primary max-w-[330px] w-1/3 min-w-[300px]"
               onChange={(e) => props.setFile(e?.target?.files![0])}
            />
            <div className="flex items-center gap-4">
               <button
                  className="btn btn-error"
                  onClick={() => navigate(`/${props.id}/posts`)}
               >
                  <span>Отменить</span>
                  <FontAwesomeIcon icon={faXmark} />
               </button>
               <button className="btn btn-primary" type="submit">
                  <span>Сохранить</span>
                  <FontAwesomeIcon icon={faCheck} />
               </button>
            </div>
         </form>
      </section>
   );
}
