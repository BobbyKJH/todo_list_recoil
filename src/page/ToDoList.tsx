import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
  password1: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "패스워드가 일치하지 않습니다." });
      console.log(watch());
    }
    setError("extraError", { message: "server down" });
  };

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          style={{ display: "flex" }}
          {...register("email", {
            required: "필수 입력",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "네이버 이메일로만 가입 가능합니다",
            },
          })}
          type="text"
          placeholder="email"
        />

        <input
          style={{ display: "flex" }}
          {...register("password", {
            required: true,
            minLength: 5,
          })}
          type="text"
          placeholder="password"
        />

        <input
          style={{ display: "flex" }}
          {...register("password1", {
            required: true,
            validate: (value) => value.includes("kim"),
          })}
          type="text"
          placeholder="password 확인"
        />

        <span>{errors.email?.message}</span>
        <span>{errors.password1?.message}</span>

        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDoList;
