import TodoItemDriver from "./TodoItem.driver";
import { Chance } from "chance";

describe("Todo Item ", () => {
  let driver: TodoItemDriver;
  const chance = Chance();
  beforeEach(() => {
    driver = new TodoItemDriver();
  });

  test("should display checkbox, edit and delete buttons", () => {
    driver.when.render();
    const editBtn = driver.then.editBtn();
    const deleteBtn = driver.then.deleteBtn();
    const checkBoxBtn = driver.then.checkBoxBtn();
    expect(editBtn.editBtnExists()).toEqual(true);
    expect(deleteBtn.deleteBtnExists()).toEqual(true);
    expect(checkBoxBtn.checkBoxBtnExists()).toEqual(true);
  });
  test("should display the todo name", () => {
    const taskTitle = chance.name();
    driver.given.name(taskTitle);
    driver.when.render();
    const title = driver.then.taskTitle();
    expect(title.getTitle()).toEqual(taskTitle);
  });
  test("should call 'removeTodo' when clicking on the delete button", () => {
    driver.when.render();
    driver.then.deleteBtn().deleteTaskClick();
    expect(driver.then.deleteTask()).toHaveBeenCalled();
  });
  test("should call editText when clicking on edit button", () => {
    driver.when.render();
    driver.then.editBtn().editBtnClick();
    expect(driver.then.editTask()).toHaveBeenCalled();
  })
  test("should display cross line on the text when clicking the checkbox", () => {
    driver.when.render();
    driver.then.checkBoxBtn().markAsDone();
    expect(driver.then.checkBoxBtn().hasCrossLine()).toEqual(true);
  });
  test("should display the new title when clicking on the edit button or pressing enter after editing", () => {});
  test("should remove cross line when clicking on the checkbox", () => {});
});
