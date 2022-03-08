import * as express from "express";
import { ToDoModel, Todo } from "../models";
import checkCookies from "../middlewares/cookies";
import * as cookieParser from "cookie-parser";
import { Chance } from "chance";
const chance = Chance();

const toDoRouter = express();
toDoRouter.use(cookieParser());
toDoRouter.use(checkCookies);

toDoRouter.get("/", async (req, res) => {
  const _id = req.body.userId;
  try {
    const toDoList = await ToDoModel.findById(_id).clone();
    res.send(toDoList).status(200);
  } catch (error) {
    res.sendStatus(400);
  }
});
toDoRouter.get("/:id", async (req, res) => {
  const _id = req.params.id;
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
toDoRouter.post("/:id", async (req, res) => {
  const _id = req.params.id;
  let toDoList: Todo;
  let taskId: string;

  try {
    toDoList = await ToDoModel.findById(_id).clone();
    if (!toDoList) {
      toDoList = await createNewUser(_id);
    }
    taskId = chance.guid();
    toDoList.tasks[taskId] = req.body.title;
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
toDoRouter.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const { id: taskId, title: newTitle } = req.body;
  const tasksList = await ToDoModel.findById(userId).clone();
  if (!tasksList.tasks[taskId]) {
    res.sendStatus(404);
    return;
  }
  tasksList.tasks[taskId] = newTitle;
  await ToDoModel.findByIdAndUpdate(userId, {
    $set: { tasks: tasksList.tasks },
  });
  res.sendStatus(200);
});

const createNewUser = async function (userId: string): Promise<Todo> {
  const newUser = new ToDoModel({ _id: userId, tasks: {} });
  return await newUser.save();
};
const errorHandler = function (err: string) {
  throw new Error(err);
};

export default toDoRouter;
