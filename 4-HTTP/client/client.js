import axios from "axios";

const baseURL = "http://localhost:3000";
const instance = axios;

const getToDoList = function () {
  return instance
    .get(`${baseURL}/todos`)
    .then((res) => res.data)
    .catch(errorHandler);
};
const addTask = function (taskTitle) {
  return instance
    .post(`${baseURL}/todos`, { title: taskTitle })
    .then((res) => res.data)
    .catch(errorHandler);
};
const editTask = function (taskInfo) {
  const { taskId, newTitle } = taskInfo;
  return instance
    .patch(`${baseURL}/todos/${taskId}`, { title: newTitle })
    .then((res) => res.data)
    .catch(errorHandler);
};
const deleteTask = function (taskId) {
  return instance
    .delete(`${baseURL}/todos/${taskId}`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const errorHandler = (err) => {
  console.log(err);
};

export { getToDoList, addTask, editTask, deleteTask };
