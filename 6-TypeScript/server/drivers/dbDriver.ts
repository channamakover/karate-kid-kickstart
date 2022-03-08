import { ToDoModel, Todo } from "../models";
import * as mongoose from "mongoose";
import { Chance } from "chance";

const dbManager = function (url: string) {
  const chance = new Chance();
  const connectToDb = function (): void {
    mongoose.connect(url);
  };
  const getAllTodos = async function (id: string): Promise<any> {
    try {
      const todosList = await ToDoModel.findById(id);
      if (!todosList) {
        return null;
      }
      return todosList;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getTodoById = async function (id: string, taskId: string) {
    if (!id || !taskId) {
      throw new Error("missing argument");
    }
    try {
      const data = await ToDoModel.findById(id).clone();
      return data.tasks[taskId];
    } catch (error) {
      throw new Error(error);
    }
  };

  const addTodo = async function (
    id: string,
    title: string
  ): Promise<string> {
    if (!id) {
      return "there is no id";
    }
    const taskId = chance.guid();
    let toDoList = await getAllTodos(id);
    if (!toDoList) {
      toDoList = await createNewUser(id);
    }

    toDoList.tasks[taskId] = title;
    try {
      await ToDoModel.findByIdAndUpdate(id, {
        $set: { tasks: toDoList.tasks },
      });
      return taskId;
    } catch (error) {
      errorHandler(error);
    }
  };
  const updateTodo = async function (
    id: string,
    taskId: string,
    title: string
  ): Promise<string> {
    if (!id || !taskId || !title) {
      return "there is missing argument";
    }
    const toDoList: Todo = await ToDoModel.findById(id).clone();
    try {
      toDoList.tasks[taskId] = title;
      await ToDoModel.findByIdAndUpdate(id, {
        $set: { tasks: toDoList.tasks },
      });
    } catch (error) {
      return error;
    }
  };
  const deleteTodo = async function (id: string, taskId: string) {
    if (!id || !taskId) {
      throw new Error("missing argument");
    }
    const toDoList = await ToDoModel.findById(id).clone();
    try {
      delete toDoList.tasks[taskId];
      await ToDoModel.findByIdAndUpdate(id, {
        $set: { tasks: toDoList.tasks },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const createNewUser = async function (userId: string): Promise<Todo> {
    const newUser = new ToDoModel({ _id: userId, tasks: {} });
    return await newUser.save();
  };
  const errorHandler = function (err: Error) {
    console.log(err);
  };
  return {
    connectToDb,
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
export default dbManager;
