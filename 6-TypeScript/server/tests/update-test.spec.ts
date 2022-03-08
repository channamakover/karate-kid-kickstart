import testkitCreator from "./testkit";
import { Chance } from "chance";
import { Todo } from "../models";
const testkit = testkitCreator();
const chance = Chance();
describe("testing update", () => {
  testkit.beforeAndAfter();
  const { appdriver, dbdriver } = testkit.drivers();

  it("should...", async () => {
    const taskTitle = "go to work";
    const newTitle = "go home!";
    const userId = chance.guid();
    let task: Todo;
    const taskId = await dbdriver.addTodo(userId, taskTitle);

    try {
      task = await appdriver.editTask(userId,{ id: taskId, title: newTitle });
      expect(task.tasks[taskId]).toEqual(newTitle);
    } catch (error) {
      console.log(error);
    }
  });
  it("should fail", async () => {
    const taskTitle = "go to work";
    const newTitle = "go home!";
    const userId = chance.guid();
    const fakeTaksId = chance.guid();
    let task: Todo;
    const taskId = await dbdriver.addTodo(userId, taskTitle);
    try {
      task = await appdriver.editTask(userId,{ id: taskId, title: newTitle });
    } catch (error) {
        console.log(error);
        expect(error.response.status).toEqual(404);
    }
  });
});
