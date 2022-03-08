import testkitCreator from "./testkit";
import { Chance } from "chance";
describe("test post endpoint", () => {
  const testkit = testkitCreator();
  testkit.beforeAndAfter();
  const chance = Chance();
  const { appdriver, dbdriver } = testkit.drivers();
  it("should return something", async () => {
    const taskTitle = "go home";
    let userId, taskId, tasks;
    try {
      userId = chance.guid();
      taskId = await appdriver.addTask(userId, taskTitle);
      tasks = await dbdriver.getAllTodos(userId);
    } catch (error) {
      expect(tasks[taskId]).toEqual(taskTitle);
    }
  });
});
