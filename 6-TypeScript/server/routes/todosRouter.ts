import * as express from "express";
import { ToDoModel,  UserTodos,  TaskDescription } from "../models";
import addCookie from "../middlewares/cookies";
import * as cookieParser from "cookie-parser";
import { Chance } from "chance";
const chance = Chance();

const toDoRouter = express();
toDoRouter.use(cookieParser());
toDoRouter.use(addCookie);

toDoRouter.get("/", async (req, res) => {
  const _id = req.cookies.userId;
  try {
    const toDoList = await ToDoModel.findById(_id).clone();
    res.send(toDoList).status(200);
  } catch (error) {
    res.sendStatus(400);
  }
});
toDoRouter.get("/:id", async (req, res) => {
  const _id = req.cookies.userId;
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
});
toDoRouter.post("/", async (req, res) => {
  const _id = req.cookies.userId;

  let toDoList: UserTodos;
  let taskId: string;

  try {
    toDoList = await ToDoModel.findById(_id).clone();
    if (!toDoList) {
      toDoList = await createNewUser(_id);
    }
    taskId = chance.guid();
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
});
toDoRouter.put("/:id", async (req, res) => {
  const userId = req.cookies.userId;
  const taskId = req.params.id;
  const newTitle = req.body.title;
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
});
toDoRouter.delete("/:id", async (req, res) => {
  const userId = req.cookies.userId;
  const taskId = req.params.id;
  const tasksList = await ToDoModel.findById(userId).clone();
  if (!tasksList || !tasksList.tasks[taskId]) {
    res.sendStatus(204);
    return;
  }
  delete tasksList.tasks[taskId];
  await ToDoModel.findByIdAndUpdate(userId, {
    $set: { tasks: tasksList.tasks },
  });
  res.sendStatus(200);
});

const createNewUser = async function (userId: string): Promise<UserTodos> {
  const newUser = new ToDoModel({ _id: userId, tasks: {} });
  return await newUser.save();
};
const errorHandler = function (err: string) {
  throw new Error(err);
};

export default toDoRouter;
