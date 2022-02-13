/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./toDoListApp.js":
/*!************************!*\
  !*** ./toDoListApp.js ***!
  \************************/
/***/ (() => {

eval("\n(function () {\n \n  let idSerializer = 0;\n  createAddTaskContainer();\n  if (localStorage){\n    restoreTasksFromStorage();\n  }\n\n  function createAddTaskContainer() {\n    const buttonContainer = document.getElementById(\"add-button-container\");\n    const toDoTaskInput = document.getElementById(\"task-title-input\");\n    toDoTaskInput.addEventListener(\"change\", () => addNewTask());\n    const addButton = createButtonElement(\n      [\"button-style\"],\n      \"click\",\n      addNewTask\n    );\n    addButton.textContent = \"add\";\n    buttonContainer.appendChild(addButton);\n  }\n  function createButtonElements(taskInfo) {\n    const buttonsWrapper = createHtmlElement(\"div\", [\"buttons-wrapper\"]);\n    const editButtonElement = createEditButton(taskInfo);\n    const deleteButtonElement = createDeleteButton(taskInfo);\n    buttonsWrapper.appendChild(editButtonElement);\n    buttonsWrapper.appendChild(deleteButtonElement);\n    return buttonsWrapper;\n  }\n  function createEditButton(taskInfo) {\n    const editButtonElement = createButtonElement(\n      [\"edit-task-info\", \"button-style\"],\n      \"click\",\n      editElementButtonHandler,\n      taskInfo\n    );\n    editButtonElement.textContent = \"edit\";\n    return editButtonElement;\n  }\n  function createDeleteButton(taskInfo) {\n    const deleteButtonElement = createButtonElement(\n      [\"delete-task\", \"button-style\"],\n      \"click\",\n      deleteElementButtonHandler,\n      taskInfo.id\n    );\n    deleteButtonElement.textContent = \"delete\";\n    return deleteButtonElement;\n  }\n\n  function createTaskInfoElement(title) {\n    const taskTitleElement = createHtmlElement(\"h3\", [\"to-do-task-title\"]);\n    taskTitleElement.id = \"task-title\";\n    taskTitleElement.textContent = title;\n    return taskTitleElement;\n  }\n\n  function createTask(title) {\n    const taskInfo = {\n      title: title,\n      isEditMode: false,\n      isDone: false,\n      id: getNewTaskId(),\n    };\n    const toDoTaskElement = createHtmlElement(\"li\", [\"to-do-tasks\"]);\n    toDoTaskElement.id = taskInfo.id;\n    const checkBoxElement = createTaskCheckBoxElement(taskInfo);\n    toDoTaskElement.appendChild(checkBoxElement);\n    const taskInfoElement = createTaskInfoElement(taskInfo.title);\n    toDoTaskElement.appendChild(taskInfoElement);\n    const buttonsWrapper = createButtonElements(taskInfo);\n    toDoTaskElement.appendChild(buttonsWrapper);\n    localStorage.setItem(`${taskInfo.id}`,JSON.stringify(taskInfo));\n    let ulElement = document.getElementById(\"to-do-list-container\");\n    ulElement.appendChild(toDoTaskElement);\n    \n  }\n  function createTaskCheckBoxElement(taskInfo) {\n    const checkBoxElement = createHtmlElement(\"input\", [\"to-do-task-checkbox\"]);\n    checkBoxElement.type = \"checkbox\";\n    checkBoxElement.id = \"task-checkbox\";\n    checkBoxElement.addEventListener(\"click\", (e) => {\n      markTaskAsDone(e, taskInfo);\n    });\n    return checkBoxElement;\n  }\n\n  function createHtmlElement(tagName, ...className) {\n    const htmlElement = document.createElement(tagName);\n    htmlElement.classList.add(...className);\n    return htmlElement;\n  }\n\n  function getNewTaskId(ev) {\n    idSerializer++;\n    return idSerializer.toString();\n  }\n\n  function deleteElementButtonHandler(event, id) {\n    const task = document.getElementById(id);\n    task.remove();\n    localStorage.removeItem(`${id}`)\n  }\n\n  function editElementButtonHandler(event, taskInfo) {\n    console.log(taskInfo.isEditMode);\n    if (!taskInfo.isEditMode) {\n      editElementTitle(taskInfo);\n      taskInfo.isEditMode = true;\n    } else {\n      setElementTitle(taskInfo);\n      taskInfo.isEditMode = false;\n    }\n  }\n  function editElementTitle(taskInfo) {\n    const task = document.getElementById(taskInfo.id);\n    const taskTitle = task.querySelector(\"#task-title\");\n    const taskCheckBox = task.querySelector(\"#task-checkbox\");\n    taskCheckBox.disabled = true;\n    const taskNewTitle = createHtmlElement(\"input\", [\"task-new-title-input\"]);\n    taskNewTitle.id = \"task-input-field\";\n    taskNewTitle.value = taskInfo.title;\n    task.replaceChild(taskNewTitle, taskTitle);\n    taskNewTitle.addEventListener(\"keydown\", (e) => {\n      if (e.code == \"Enter\") {\n        setElementTitle(taskInfo);\n        taskInfo.isEditMode = false;\n      }\n    });\n  }\n  function setElementTitle(taskInfo) {\n    const task = document.getElementById(taskInfo.id);\n    const taskInputField = task.querySelector(\"#task-input-field\");\n    const newTitle = createHtmlElement(\"h3\", [\"to-do-task-title\"]);\n    const taskCheckBox = task.querySelector(\"#task-checkbox\");\n    taskCheckBox.disabled = false;\n    newTitle.id = \"task-title\";\n    newTitle.textContent = taskInputField.value;\n    taskInfo.title = newTitle.textContent;\n    task.replaceChild(newTitle, taskInputField);\n    localStorage.setItem(`${taskInfo.id}`,JSON.stringify(taskInfo));\n  }\n\n  function createButtonElement(\n    className,\n    eventType,\n    callBack = () => {},\n    ...args\n  ) {\n    const buttonElement = createHtmlElement(\"button\", className);\n    buttonElement.addEventListener(eventType, (event) => {\n      callBack(event, ...args);\n    });\n    return buttonElement;\n  }\n  function markTaskAsDone(event, taskInfo) {\n    const task = document.getElementById(taskInfo.id);\n    const taskCheck = task.querySelector(\"#task-checkbox\");\n    const title = task.querySelector(\"#task-title\");\n    if (taskCheck.checked) {\n      title.classList.add(\"done-task\");\n      taskInfo.isDone = true;\n    } else {\n      title.classList.remove(\"done-task\");\n      taskInfo.isDone = false;\n    }\n  }\n\n  function addNewTask(ev) {\n    const taskTitleInput = document.getElementById(\"task-title-input\");\n    const taskTitle = taskTitleInput.value;\n    if (taskTitle) {\n      createTask(taskTitle);\n      taskTitleInput.value = \"\";\n    }\n  }\n  function restoreTasksFromStorage(){\n      Object.values(localStorage).forEach(taskInfo =>{createTask(JSON.parse(taskInfo).title)})\n  }\n})();\n\n\n//# sourceURL=webpack://2-webpack/./toDoListApp.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./toDoListApp.js"]();
/******/ 	
/******/ })()
;