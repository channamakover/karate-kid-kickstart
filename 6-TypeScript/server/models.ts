import * as mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  tasks: {
    type: Object,
  },


});
type TaskDescription = {
  title:string,
  isChecked:boolean,
}

type Todo = {
  [todoId: string]: TaskDescription
}

type UserTodos = {
  [userId in string]: TaskDescription
}
interface Todos {
  mainObject: UserTodos
}

const ToDoModel = mongoose.model<UserTodos>("ToDo", ToDoSchema);

export { ToDoModel, Todos,UserTodos,Todo,TaskDescription };
