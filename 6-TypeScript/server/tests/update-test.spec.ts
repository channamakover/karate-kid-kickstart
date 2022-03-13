import testkitCreator from "./testkit";
import { Chance } from "chance";
import { TaskDescription, UserTodos } from "../models";
describe("testing update", () => {
  const testkit = testkitCreator();
  const chance = Chance();
  testkit.beforeAndAfter();
  const { appdriver, dbdriver } = testkit.drivers();

  it("should...", async () => {
    const taskTitle: string = "go to work";
    const newTitle: string = "go home!";
    const userId: string = chance.guid();
    let task: UserTodos;
    const taskId: string = await dbdriver.addTodo(userId, taskTitle);

    try {
      appdriver.setUserCookie(userId);
      await appdriver.editTask(taskId, newTitle);
    } catch (error) {
      console.log(error);
    }
    try {
      const toDoList: TaskDescription = await dbdriver.getTodoById(
        userId,
        taskId
      );
      expect(toDoList.title).toEqual(newTitle);
    } catch (error) {
      console.log(error);
    }
  });
  it("should fail", async () => {
    const taskTitle: string = "go to work";
    const newTitle: string = "go home!";
    const userId: string = chance.guid();
    const fakeTaskId: string = chance.guid();
    const taskId: string = await dbdriver.addTodo(userId, taskTitle);
    try {
      appdriver.setUserCookie(userId);
      await appdriver.editTask(fakeTaskId, newTitle);
    } catch (error) {
      console.log(error);
      expect(error.response.status).toEqual(404);
    }
  });
});
