import TodoItem from "./TodoItem";
import { render, RenderResult } from "@testing-library/react";
import dataHooks from "./data-hooks";
import React from "react";

class TodoItemDriver {
  private wrapper?: RenderResult;
  private todoDescription: string = "";
  private editTextMock: jest.Mock = jest.fn();
  private markAsDoneMock: jest.Mock = jest.fn();
  private todoItem = () => {
    return {
      editBtnExists: () => {
        return this.wrapper?.queryByTestId(dataHooks.editBtn) ? true : false;
      },
      deleteBtnExists: () => {
        return this.wrapper?.queryByTestId(dataHooks.deleteBtn) ? true : false;
      },
      checkBoxBtnExists: () => {
        return this.wrapper?.queryByTestId(dataHooks.checkbox) ? true : false;
      },
    };
  };
  given = {};
  when = {
    render: () => {
      this.wrapper = render(<TodoItem title={this.todoDescription} />);
    },
  };
  then = {
    todoItem: this.todoItem,
  };
}

export default TodoItemDriver;
