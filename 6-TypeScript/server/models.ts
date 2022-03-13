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
  title: string;
  isChecked: boolean;
};
type UserTodos = {
  [userId in string]: TaskDescription;
};

const ToDoModel = mongoose.model<UserTodos>("ToDo", ToDoSchema);

export { ToDoModel, UserTodos, TaskDescription };
