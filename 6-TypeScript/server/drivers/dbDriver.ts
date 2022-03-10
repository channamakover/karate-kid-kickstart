import { ToDoModel, Todo, UserTodos, Todos, TaskDescription } from "../models";
import * as mongoose from "mongoose";
import { Chance } from "chance";

const dbManager = function (url: string) {
  const chance = new Chance();
  const connectToDb = function (): void {
    mongoose.connect(url);
  };
  const getAllTodos = async function (id: string): Promise<UserTodos> {
    try {
      const todosList = await ToDoModel.findById(id).clone();
      if (!todosList) {
        return null;
      }
      return todosList;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getTodoById = async function (
    id: string,
    taskId: string
  ): Promise<TaskDescription> {
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
    newTitle: string
  ): Promise<string> {
    if (!id) {
      return "there is no id";
    }
    const taskId = chance.guid();
    let toDoList: UserTodos = await getAllTodos(id);
    if (!toDoList) {
      toDoList = await createNewUser(id);
    }
    toDoList.tasks[taskId] = { title: newTitle, isChecked: false };
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
    const toDoList: UserTodos = await ToDoModel.findById(id).clone();
    try {
      toDoList.tasks[taskId].title = title;
      await ToDoModel.findByIdAndUpdate(id, {
        $set: { tasks: toDoList },
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
      delete toDoList[taskId];
      await ToDoModel.findByIdAndUpdate(id, {
        $set: { tasks: toDoList },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const createNewUser = async function (userId: string): Promise<UserTodos> {
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
