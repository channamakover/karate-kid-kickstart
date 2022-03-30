import TodoItem from "./TodoItem";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import dataHooks from "./data-hooks";
import React from "react";
import { electron } from "webpack";
import { memoryUsage } from "process";

class TodoItemDriver {
  private wrapper?: RenderResult;
  private todoDescription: string = "";
  private deleteTaskMock: jest.Mock = jest.fn();
  private editTextMock: jest.Mock = jest.fn();
  private baseElementDriver = (dataHook: string) => {
    const element = () => this.wrapper?.queryByTestId(dataHook);
    const click = () => {
      const myElement = element();
      if (!myElement) {
        throw new Error("couldnt find element on dom");
      }
      fireEvent.click(myElement);
    };
    const exists = () => element() != null;
    return { click, exists };
  };

  private editBtn = () => {
    const editBtnDriver = this.baseElementDriver(dataHooks.editBtn);
    return editBtnDriver;
  };
  private deleteBtn = () => {
    const deleteBtnDriver = this.baseElementDriver(dataHooks.deleteBtn);
    return deleteBtnDriver;
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
    const element = this.wrapper?.queryByTestId(dataHooks.checkbox);
    const clickCheckBox = () => {
      if (element) {
        fireEvent.click(element);
      }
    };
    return {
      checkBoxBtnExists: () => {
        return element ? true : false;
      },
      markAsDone: () => {
        clickCheckBox();
      },
      unMarkAsDone: () => {
        clickCheckBox();
      },
      hasCrossLine: () => {
        return element?.classList.contains("done-task");
      },
    };
  };

  given = {
    title: (title: string) => {
      this.todoDescription = title;
    },
  };
  when = {
    render: () => {
      this.wrapper = render(
        <TodoItem
          title={this.todoDescription}
          deleteTaskHandler={this.deleteTaskMock}
          editTaskHandler={this.editTextMock}
        />
      );
    },
    clickEdit: () => this.editBtn().click(),
    clickDelete: () => this.deleteBtn().click(),
    markTaskAsDone: () => this.checkBoxBtn().markAsDone(),
    unMarkTaskAsDone: () => this.checkBoxBtn().unMarkAsDone(),
  };
  then = {
    editBtn: this.editBtn,
    deleteBtn: this.deleteBtn,
    taskTitle: this.taskTitle,
    checkBoxBtn: this.checkBoxBtn,
    deleteTask: () => this.deleteTaskMock,
    editTask: () => this.editTextMock,
  };
}

export default TodoItemDriver;
