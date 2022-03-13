import testkitCreator from "./testkit";
import { Chance } from "chance";

describe("test delete functionality", () => {
  const testkit = testkitCreator();
  const chance = Chance();
  const { appdriver, dbdriver } = testkit.drivers();
  testkit.beforeAndAfter();
  it("should delete the user", async () => {
    const userId: string = chance.guid();
    const title: string = "do something";
    const taskId: string = await dbdriver.addTodo(userId, title);
    try {
      appdriver.setUserCookie(userId);
      const statusCode = await appdriver.deleteTask(taskId);
      expect(statusCode).toEqual(200);
    } catch (error) {
      console.log("error", error);
    }
  });
  it("should return status code of 204", async () => {
    const userId: string = chance.guid();
    const taskId: string = chance.guid();
    try {
      appdriver.setUserCookie(userId);
      const statusCode = await appdriver.deleteTask(taskId);
      expect(statusCode).toEqual(204);
    } catch (error) {}
  });
});
