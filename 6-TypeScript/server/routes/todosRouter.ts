import * as express from "express";
import { ToDoModel } from "../models";
import checkCookies from "../middlewares/cookies";
import * as cookieParser from "cookie-parser";
import { Chance } from "chance";
const chance = Chance();

const toDoRouter = express();
toDoRouter.use(cookieParser());
toDoRouter.use(checkCookies);

toDoRouter.get("/", async (req, res) => {
  const _id = req.body.userId;
  const toDoList = await ToDoModel.findById(_id).clone();
  res.send(toDoList);
});
toDoRouter.get("/:id", async (req, res) => {
  const _id = req.params.id;
  const toDoList = await ToDoModel.findById(_id).clone();
  res.send(toDoList);
});

export default toDoRouter;
