import  React from "react";
import ReactDOM from "react-dom";
import TodoItem from './components/TodoItem/TodoItem'
const deleteHandler = () => {
    console.log("delete")
}
const editTaskHandler = () => {
    console.log("delete")
}
ReactDOM.render(
    <TodoItem title="go home" deleteTaskHandler={deleteHandler} editTaskHandler={ editTaskHandler}/>,
  document.getElementById("root")
);
