import testkitCreator from "./testkit";
import { ToDoModel,UserTodos,TaskDescription } from '../models';

import { Chance } from "chance";
describe("test post endpoint", () => {
  const testkit = testkitCreator();
  testkit.beforeAndAfter();
  const chance = Chance();
  const { appdriver, dbdriver } = testkit.drivers();
  it("should return something", async () => {
    const taskTitle = "go home";
    let userId:string, taskId:string, toDoList:UserTodos,taskId2:string;
    try {
      userId = chance.guid();
      appdriver.setUserCookie(userId);
      taskId = await appdriver.addTask(taskTitle);
      taskId2 = await appdriver.addTask("helo")
      toDoList = await dbdriver.getAllTodos(userId);
    } catch (error) {
      expect(toDoList.tasks[taskId].title).toEqual(taskTitle);
    }
  });
});
