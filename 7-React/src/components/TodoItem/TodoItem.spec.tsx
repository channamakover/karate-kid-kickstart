import TodoItemDriver from "./TodoItem.driver";

describe("Todo Item ", () => {
  let driver: TodoItemDriver;
  beforeEach(() => {
    driver = new TodoItemDriver();
  });

  test("should display checkbox, edit and delete buttons", () => {
    driver.when.render();
    const todoItem = driver.then.todoItem();
    expect(todoItem.editBtnExists()).toEqual(true);
    expect(todoItem.deleteBtnExists()).toEqual(true);
    expect(todoItem.checkBoxBtnExists()).toEqual(true);
  });
  test("should display the todo name", () => {});
  test("should display input box when clicking on edit button", () => {});
  test("should call 'removeTodo' when clicking on the delete button", () => {});
  test("should display cross line on the text when clicking the checkbox", () => {});
  test("should display the new title when clicking on the edit button or pressing enter after editing", () => {});
  test("should remove cross line when clicking on the checkbox", () => {});
});
