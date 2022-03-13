import testkitCreator from "./testkit";
import { Chance } from "chance";
import { UserTodos } from "../models";

describe("test server", () => {
  const chance = Chance();
  const testkit = testkitCreator();
  testkit.beforeAndAfter();

  const { appdriver, dbdriver } = testkit.drivers();
  it("should return a status code of not found", async () => {
    const fakeTaskId: string = chance.guid();
    try {
      await appdriver.getTaskById(fakeTaskId);
    } catch (error) {
      expect(error.response.status).toEqual(400);
    }
  });
  it("should return todo's list", async () => {
    const userId = chance.guid();
    let todoId: string, todoId2: string;
    try {
      todoId = await dbdriver.addTodo(userId, "FINISH");
      todoId2 = await dbdriver.addTodo(userId, "checking PR");
    } catch (error) {
      console.log(error);
    }
    try {
      appdriver.setUserCookie(userId);
      const toDoList: UserTodos = await appdriver.getAll();
      expect(toDoList.tasks[todoId].title).toEqual("FINISH");
    } catch (error) {
      console.log(error);
    }
  });
});
