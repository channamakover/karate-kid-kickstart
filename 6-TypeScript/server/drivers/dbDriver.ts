import { ToDoModel, Todo } from "../models";
import mongoose from "mongoose";
import { Chance } from "chance";

const dbManager = function (url: string): Object {
  const chance = new Chance();
  const connectToDb = function (): void {
    mongoose.connect(url);
  };
  const getAllTodos = async function (
    id: string | number
  ): Promise<any> {
    try {
      const todosList = await ToDoModel.findById(id);
      return todosList.tasks;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getTodoById = async function (
    id: string | number,
    taskId: string | number
  ): Promise<string> | undefined {
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
    id: string | number,
    title: string
  ): Promise<string | Todo> {
    if (!id) {
      return "there is no id";
    }
    const toDoList = await getAllTodos(id);
    const taskId = chance.guid();
    toDoList.tasks[taskId] = title;
    return await ToDoModel.findByIdAndUpdate(id, {
      $set: { tasks: toDoList.tasks },
    });
  };
  const updateTodo = async function (
    id: string | number,
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
  const deleteTodo = async function (
    id: string | number,
    taskId: string | number
  ) {
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
  return { connectToDb, getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo };
};
export default dbManager;
