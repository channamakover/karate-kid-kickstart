import React, { useState } from "react";
import classes from "./TodoItem.module.css";
import dataHooks from "./data-hooks";

const TodoItem: React.FC<{
  title: string;
  deleteTaskHandler: () => void;
  editTaskHandler: () => void;
}> = ({ title, deleteTaskHandler, editTaskHandler }) => {
  const [isDone, setIsDone] = useState(false);
  const toggleHandler = () => {
    setIsDone((prevState) => !prevState);
  };
  return (
    <li data-hook={dataHooks.root} className={classes["to-do-tasks"]}>
      <input
        data-hook={dataHooks.checkbox}
        type="checkbox"
        onClick={toggleHandler}
        className={isDone ? classes["done-task"] : ""}
      />
      <h3 data-hook={dataHooks.title}>{title}</h3>
      <div className={classes["buttons-wrapper"]}>
        <button
          data-hook={dataHooks.editBtn}
          className={classes["button-style"]}
          onClick={editTaskHandler}
        >
          edit
        </button>
        <button
          data-hook={dataHooks.deleteBtn}
          className={classes["button-style"]}
          onClick={deleteTaskHandler}
        >
          delete
        </button>
      </div>
    </li>
  );
};
export default TodoItem;
