import { useForm } from "react-hook-form";
import { atom, useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldTodo) => [
      ...oldTodo,
      { text: toDo, id: Date.now(), category: "TO_DO" },
    ]);
    setValue("toDo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Please Write a Todo",
          })}
          type="text"
          placeholder="To Do List "
        />
        <button>Add</button>
      </form>

      <span>{errors?.toDo?.message}</span>
    </>
  );
};

export default CreateToDo;
