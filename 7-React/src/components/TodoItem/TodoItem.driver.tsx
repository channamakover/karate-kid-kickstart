import TodoItem from "./TodoItem";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import dataHooks from "./data-hooks";
import React from "react";

class TodoItemDriver {
  private wrapper?: RenderResult;
  private todoDescription: string = "";
  private deleteTaskMock: jest.Mock = jest.fn();
  private editTextMock: jest.Mock = jest.fn();
  private markAsDoneMock: jest.Mock = jest.fn();

  private editBtn = () => {
    return {
      editBtnExists: () => {
        return this.wrapper?.queryByTestId(dataHooks.editBtn) ? true : false;
      },
    };
  };
  private deleteBtn = () => {
    const element = this.wrapper?.queryByTestId(dataHooks.deleteBtn);
    return {
      deleteBtnExists: () => {
        return element ? true : false;
      },
      deleteTaskClick: () => {
        if (element) {
          fireEvent.click(element);
        }
      },
    };
  };
  private taskTitle = () => {
    const element = this.wrapper?.queryByTestId(dataHooks.title);
    return {
      getTitle: () => {
        return element?.textContent;
      },
    };
  };
  private checkBoxBtn = () => {
    return {
      checkBoxBtnExists: () => {
        return this.wrapper?.queryByTestId(dataHooks.checkbox) ? true : false;
      },
    };
  };

  given = {
    name: (name: string) => {
      this.todoDescription = name;
    },
  };
  when = {
    render: () => {
      this.wrapper = render(
        <TodoItem
          title={this.todoDescription}
          deleteTaskHandler={this.deleteTaskMock}
        />
      );
    },
  };
  then = {
    editBtn: this.editBtn,
    deleteBtn: this.deleteBtn,
    taskTitle: this.taskTitle,
    checkBoxBtn: this.checkBoxBtn,
    deleteTask: () => this.deleteTaskMock,
  };
}

export default TodoItemDriver;
