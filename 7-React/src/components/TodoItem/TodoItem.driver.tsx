import TodoItem from "./TodoItem";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import dataHooks from "./data-hooks";
import React from "react";

class TodoItemDriver {
  private wrapper?: RenderResult;
  private todoDescription: string = "";
  private deleteTaskMock: jest.Mock = jest.fn();
  private editTextMock: jest.Mock = jest.fn();
  private toggleDone: jest.Mock = jest.fn();

  private editBtn = () => {
    const element = this.wrapper?.queryByTestId(dataHooks.editBtn)
    return {
      editBtnExists: () => {
        return element ? true : false;
      },
      editBtnClick: () => {
        if (element) {
          fireEvent.click(element)
        }
      }
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
    const element = this.wrapper?.queryByTestId(dataHooks.checkbox)
    return {
      checkBoxBtnExists: () => {
        return element ? true : false;
      },
      markAsDone: () => {
        
      },
      unMarkAsDone: () => {
        
      },
      hasCrossLine: () => {
        
      }
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
          editTaskHandler={this.editTextMock}
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
    editTask: () => this.editTextMock,
  };
}

export default TodoItemDriver;
