import testkitCreator from "./testkit";
import { Chance } from "chance";
const testkit = testkitCreator();
const chance = Chance();

describe("test delete functionality", () => {
  const { appdriver, dbdriver } = testkit.drivers();
  testkit.beforeAndAfter();
  it("should delete the user", async () => {
    const userId = chance.guid();
    const title = "do something";
    const taskId = await dbdriver.addTodo(userId, title);
    try {
      const res = await appdriver.deleteTask(userId, taskId);
      expect(res).toEqual(200);
    } catch (error) {
      console.log("error", error);
    }
  });
  it("should return status code of 204", async () => {
      const userId = chance.guid();
      const taskId = chance.guid();
      try {
          const res = await appdriver.deleteTask(userId, taskId);
          expect(res).toEqual(204);
      } catch (error) {
          
      }
  })

});
