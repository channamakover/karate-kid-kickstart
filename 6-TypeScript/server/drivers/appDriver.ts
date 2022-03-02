import axios from "axios";
import { Todo } from "../models";
const baseURL = "http://localhost:3000";

axios.defaults.withCredentials = true;
interface TaskInfo {
  id: String;
  title: String;
  isEditMode: boolean;
  isDone: boolean;
}

const getToDoList = function (): Promise<Array<Todo>> {
  return axios
    .get(`${baseURL}/todos`)
    .then((res) => res.data)
    .catch(errorHandler);
};
const getTaskById = function (taskId: string): Promise<Todo> {
  return axios
    .get(`${baseURL}/todos/${taskId}`)
    .then((res) => res.data)
    .catch(errorHandler);
};
const addTask = function (taskTitle: string): Promise<number> {
  return axios
    .post(`${baseURL}/todos`, { title: taskTitle })
    .then((res) => res.data)
    .catch(errorHandler);
};
const editTask = function (taskInfo: TaskInfo): Promise<number> {
  const { id: taskId, title: newTitle } = taskInfo;
  return axios
    .patch(`${baseURL}/todos/${taskId}`, { title: newTitle })
    .then((res) => res.data)
    .catch(errorHandler);
};
const deleteTask = function (taskId: string): Promise<number> {
  return axios
    .delete(`${baseURL}/todos/${taskId}`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const errorHandler = (err: string) => {
  console.log(err);
};

export { getToDoList, addTask, getTaskById, editTask, deleteTask };
