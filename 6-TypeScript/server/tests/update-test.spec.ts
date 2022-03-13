import testkitCreator from "./testkit";
import { Chance } from "chance";
import { UserTodos } from "../models";
const testkit = testkitCreator();
const chance = Chance();
describe("testing update", () => {
  testkit.beforeAndAfter();
  const { appdriver, dbdriver } = testkit.drivers();

  it("should...", async () => {
    const taskTitle = "go to work";
    const newTitle = "go home!";
    const userId = chance.guid();
    let task: UserTodos;
    const taskId = await dbdriver.addTodo(userId, taskTitle);

    try {
      appdriver.setUserCookie(userId);
      await appdriver.editTask(taskId, newTitle);
    } catch (error) {
      console.log(error);
    }
    try {
      const toDoList = await dbdriver.getTodoById(userId, taskId);
      expect(toDoList.title).toEqual(newTitle);
    } catch (error) {
      console.log(error);
    }
  });
  it("should fail", async () => {
    const taskTitle = "go to work";
    const newTitle = "go home!";
    const userId = chance.guid();
    const fakeTaskId = chance.guid();
    const taskId = await dbdriver.addTodo(userId, taskTitle);
    try {
      appdriver.setUserCookie(userId);
      await appdriver.editTask(fakeTaskId, newTitle);
    } catch (error) {
      console.log(error);
      expect(error.response.status).toEqual(404);
    }
  });
});
