import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

const ToDo = ({ text, category, id }: IToDo) => {
  const ToDos = useSetRecoilState(toDoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    ToDos((todo) => {
      const targetIndex = todo.findIndex((todo) => todo.id === id);
      // const oldToDo = todo[targetIndex];
      const newToDo = { text, id, category: name as any };
      // console.log(oldToDo, newToDo);
      return [
        ...todo.slice(0, targetIndex),
        newToDo,
        ...todo.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}

      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}

      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
};

export default ToDo;
