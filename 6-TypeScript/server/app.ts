import * as express from "express";

import toDoRouter from "./routes/todosRouter";
import cors from "cors";
import * as mongoose from "mongoose";

const server = function (dburl) {
  let server: any;
  mongoose.connect(dburl);
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("connection started");
  });
  const app = express();

  app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/todos", toDoRouter);

  const start = function (): void {
    server = app.listen(3000);
  };

  const close = (): void => {
    server.close();
  };
  return { start, close };
};
export default server;
