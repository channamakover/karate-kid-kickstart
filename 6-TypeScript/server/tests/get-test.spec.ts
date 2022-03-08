import testkitCreator from "./testkit";
import { Chance } from "chance";

const chance = Chance();

describe("test server", () => {
  const testkit = testkitCreator();
  testkit.beforeAndAfter();

  const { appdriver, dbdriver } = testkit.drivers();
  it("should return a status code of not found", async () => {
    const fakeUserId = chance.guid();
    try {
      await appdriver.getTasksById(fakeUserId)
      
    } catch (error) {
      expect(error.response.status).toEqual(400);
    }
  });
  it("should return todo's list", async () => {
    const userId = chance.guid();
    let todoId:string;
    try {
      todoId = await dbdriver.addTodo(userId, "FINISH");
      
    } catch (error) {
      console.log(error);
    }
    expect((await (await appdriver.getTasksById(userId)).tasks[todoId])).toEqual("FINISH");
  });
});
