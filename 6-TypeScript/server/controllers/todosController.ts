import { Request, Response } from "express";
import { ToDoModel, UserTodos } from "../models";
import { Chance } from "chance";

const getAll = async function (req: Request, res: Response) {
  const _id = req.cookies.userId;
  if (!_id) {
    errorHandler("userId is missing");
    return;
  }
  try {
    const toDoList = await ToDoModel.findById(_id).clone();
    res.send(toDoList).status(200);
  } catch (error) {
    res.sendStatus(400);
  }
};
const getById = async function (req: Request, res: Response) {
  const _id = req.cookies.userId;
  if (!_id) {
    errorHandler("userId is missing");
    return;
  }
  try {
    const toDoList = await ToDoModel.findById(_id).clone();
    if (!toDoList) {
      res.sendStatus(400);
      return;
    }
    res.send(toDoList).status(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
const addNewTask = async function (req: Request, res: Response) {
  const _id = req.cookies.userId;
  if (!_id) {
    errorHandler("userId is missing");
    return;
  }

  let toDoList: UserTodos;
  let taskId: string;

  try {
    toDoList = await ToDoModel.findById(_id).clone();
    if (!toDoList) {
      toDoList = await createNewUser(_id);
    }
    taskId = Chance().guid();
    toDoList.tasks[taskId] = { title: req.body.title, isChecked: false };
  } catch (err) {
    errorHandler(err);
  }
  try {
    await ToDoModel.findByIdAndUpdate(_id, { $set: { tasks: toDoList.tasks } });
    res.send(taskId).status(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
const updateTask = async function (req: Request, res: Response) {
  const userId = req.cookies.userId;
  const taskId = req.params.id;
  const newTitle = req.body.title;
  if (!userId || !taskId) {
    errorHandler("missing arguments");
    return;
  }
  const tasksList = await ToDoModel.findById(userId).clone();
  if (!tasksList.tasks[taskId]) {
    res.sendStatus(404);
    return;
  }
  tasksList.tasks[taskId].title = newTitle;
  await ToDoModel.findByIdAndUpdate(userId, {
    $set: { tasks: tasksList.tasks },
  });
  res.sendStatus(200);
};
const deleteTask = async function (req: Request, res: Response) {
  const userId = req.cookies.userId;
  const taskId = req.params.id;
  if (!userId || !taskId) {
    errorHandler("arguments are missing");
    return;
  }
  const tasksList = await ToDoModel.findById(userId).clone();
  if (!tasksList || !tasksList.tasks[taskId]) {
    res.sendStatus(204);
    return;
  }
  delete tasksList.tasks[taskId];
  try {
    await ToDoModel.findByIdAndUpdate(userId, {
      $set: { tasks: tasksList.tasks },
    });
  } catch (error) {
    errorHandler(error);
  }
  res.sendStatus(200);
};

const createNewUser = async function (userId: string): Promise<UserTodos> {
  const newUser = new ToDoModel({ _id: userId, tasks: {} });
  return await newUser.save();
};

const errorHandler = function (err: string) {
  throw new Error(err);
};

export default { getAll, getById, addNewTask, updateTask, deleteTask };
