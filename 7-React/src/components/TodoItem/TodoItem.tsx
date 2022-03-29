import React from "react";
import classes from "./TodoItem.module.css";
import dataHooks from "./data-hooks";

const TodoItem = ({
  title,
  deleteTaskHandler,
}: {
  title: string;
  deleteTaskHandler: () => {};
}) => {
  return (
    <li data-hook={dataHooks.root} className={classes["to-do-tasks"]}>
      <input data-hook={dataHooks.checkbox} type="checkbox" />
      <h3 data-hook={dataHooks.title}>{title}</h3>
      <div className={classes["buttons-wrapper"]}>
        <button
          data-hook={dataHooks.editBtn}
          className={classes["button-style"]}
        />
        edit
        <button />
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
