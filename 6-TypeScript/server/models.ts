import mongoose from 'mongoose';

const ToDoSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  tasks: {
    type: Object,
  },
});

interface Todo {
  _id: string;
  tasks: any;
}
const ToDoModel = mongoose.model<Todo>("ToDo", ToDoSchema);

export {ToDoModel, Todo};