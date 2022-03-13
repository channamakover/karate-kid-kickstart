import toDoRouter from "./routes/todosRouter";
import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { Server } from "http";

const server = async function (dburl: string) {
  let server: Server;

  const db = mongoose.connection;
  if (!db) {
    await mongoose.connect(dburl);
  }
  db.once("open", () => {
    console.log("connection started");
  });
  const app = express();

  app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
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
