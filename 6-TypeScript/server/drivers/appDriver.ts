import axios from "axios";
import { Todo } from "../models";
axios.defaults.withCredentials = true;

const appDriver = function (baseURL: string) {
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
      .then((res) => {
        return res.data;
      })
      .catch(errorHandler);
  };
  const getTasksById = function (userId: string): Promise<Todo> {
    return axios
      .get(`${baseURL}/todos/${userId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  };
  const addTask = function (
    userId: string,
    taskTitle: string
  ): Promise<number> {
    return axios
      .post(`${baseURL}/todos/${userId}`, { title: taskTitle })
      .then((res) => res.data)
      .catch(errorHandler);
  };
  const editTask = function (
    userId: string,
    taskInfo: Partial<TaskInfo>
  ): Promise<Todo> {
    const { id: taskId, title: newTitle } = taskInfo;
    return axios
      .patch(`${baseURL}/todos/${userId}`, { id: taskId, title: newTitle })
      .then((res) => res.data)
      .catch(errorHandler);
  };
  const deleteTask = function (
    userId: string,
    taskId: string
  ){
    return axios
      .delete(`${baseURL}/todos/${userId}`, { data: { id: taskId } })
      .then((res) => res.status)
      .catch(errorHandler);
  };

  const errorHandler = (err: string) => {
    throw new Error(err);
  };

  return { getToDoList, addTask, getTasksById, editTask, deleteTask };
};
export default appDriver;
