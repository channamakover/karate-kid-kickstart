import axios from "axios";
import { Todo, TaskDescription } from "../models";
axios.defaults.withCredentials = true;

const appDriver = function (baseURL: string) {
  let _id: string;
  axios.defaults.withCredentials = true;

  const setUserCookie = function (userId: string) {
    _id = userId;
  };

  const getAll = function (): Promise<Todo> {
    return axios
      .get(`${baseURL}/todos`, headersManager())
      .then((res) => {
        return res.data;
      })
      .catch(errorHandler);
  };
  const getTaskById = function (taskId: string): Promise<Todo> {
    return axios
      .get(`${baseURL}/todos/${taskId}`, headersManager())
      .then((res) => res.data)
      .catch(errorHandler);
  };
  const addTask = function (taskTitle: string): Promise<number> {
    return axios
      .post(`${baseURL}/todos`, { title: taskTitle }, headersManager())
      .then((res) => res.data)
      .catch(errorHandler);
  };
  const editTask = function (taskId: string, title: string): Promise<Todo> {
    return axios
      .put(`${baseURL}/todos/${taskId}`, { title: title })
      .then((res) => res.data)
      .catch(errorHandler);
  };
  const deleteTask = function (taskId: string) {
    return axios
      .delete(`${baseURL}/todos/${taskId}`, headersManager())
      .then((res) => res.status)
      .catch(errorHandler);
  };

  const errorHandler = (err: string) => {
    return err;
  };
  const headersManager = function () {
    return (
      _id && {
        headers: {
          Cookie: `userId=${_id}`,
        },
      }
    );
  };

  return { getAll, addTask, getTaskById, editTask, deleteTask, setUserCookie };
};
export default appDriver;
