import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

const ToDoList = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({});

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldTodo) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...toDos,
    ]);
    setValue("toDo", "");
  };

  console.log(toDos);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Please Write a Todo",
          })}
          type="text"
          placeholder="To Do List  "
        />
        <button>Add</button>
      </form>

      <span>{errors?.toDo?.message}</span>

      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
