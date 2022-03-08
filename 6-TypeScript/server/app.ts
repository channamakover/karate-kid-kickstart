import toDoRouter from "./routes/todosRouter";
import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import checkCookies from './middlewares/cookies'

const server = async function (dburl) {
  let server;

  const db = mongoose.connection;
  if (!db) {
    await mongoose.connect(dburl);
  }
  db.once("open", () => {
    console.log("connection started");
  });
  const app = express();

  app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/todos", toDoRouter);

  const start = function () {
    server = app.listen(3000);
  };

  const close = () => {
    server.close();
  };
  return { start, close };
};
export default server;
