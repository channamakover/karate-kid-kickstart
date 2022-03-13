import * as express from "express";
import addCookie from "../middlewares/cookies";
import * as cookieParser from "cookie-parser";
import todoController from '../controllers/todosController'

const toDoRouter = express();
toDoRouter.use(cookieParser());
toDoRouter.use(addCookie);

toDoRouter.get("/", todoController.getAll)
toDoRouter.get("/:id", todoController.getById)
toDoRouter.post("/", todoController.addNewTask);
toDoRouter.put("/:id", todoController.updateTask);
toDoRouter.delete("/:id", todoController.deleteTask);


export default toDoRouter;
