import { projectFactory } from "./project.js";
import { taskFactory } from "./task.js";
import { format, parseISO } from "date-fns";

let projectArray = [];

function init() {
  if (!localStorage.getItem("storedData")) {
    // if theres no local storage then create a Default project
    createDefaultProj();
  } else {
    projectArray = JSON.parse(localStorage.getItem("storedData"));
    //use changeProject to set the selected project to the first project in the stored projectArray
    changeProject(projectArray[0]);
  }
  createTasks();
  createProjects();
}

function populateStorage() {
  localStorage.setItem("storedData", JSON.stringify(projectArray));
}

function createDefaultProj() {
  const defaultProj = projectFactory("default");
  addProjectToArray(defaultProj);
  changeProject(defaultProj);
  displaySelectedProj();
}

function deleteProject(toRemove) {
  let proj = findProject(toRemove.id);
  const index = projectArray.indexOf(proj);
  projectArray.splice(index, 1);
  populateStorage();
  let newIndex = index - 1;
  if (projectArray.length == 0) {
    changeProject("");
  } else {
    changeProject(projectArray[newIndex]);
  }
}

function selectProject() {
  const projectList = document.querySelectorAll(".project");
  projectList.forEach((project) => {
    project.addEventListener("click", function (e) {
      if (findProject(e.target.innerHTML) == undefined) {
        return;
      } else {
        changeProject(findProject(e.target.innerHTML));
      }
    });
  });
}

function findProject(name) {
  return projectArray.find((project) => project.name === name);
}

function changeProject(proj) {
  projModule.setProj(proj);
  renderProjects();
}

function displaySelectedProj() {
  let project = projModule.getProj();
  let projLi = document.getElementById(project.name);
  projLi.classList.add("selProj");
}

const projectForm = document.getElementById("project-form");

function createProjects() {
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newProj = projectFactory(project_name.value);
    addProjectToArray(newProj);
    changeProject(newProj);
    projectForm.reset();
    projModal.classList.remove("open");
  });
}

function addProjectToArray(proj) {
  projectArray.push(proj);
  populateStorage();
}

const projModule = {
  selectedProj: "",
  setProj: function (newProj) {
    this.selectedProj = newProj;
  },
  getProj: function () {
    return this.selectedProj;
  },
};

function renderProjects() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";
  if (projectArray.length == 0) {
    return;
  }

  projectArray.forEach(function (project) {
    const projectItem = document.createElement("li");
    projectItem.id = project.name;
    projectItem.classList.add("project");
    projectList.appendChild(projectItem);
    const p = document.createElement("p");
    p.innerHTML = project.name;
    projectItem.appendChild(p);
    createEditBtn(projectItem);
    createDeleteBtn(projectItem);
  });
  renderTasks();
  displaySelectedProj();
  selectProject();
}

function editProject(toEdit) {
  showEditForm();
  projModal.classList.add("open");
  project_name.value = toEdit.id;

  editProjBtn.addEventListener("click", function () {
    let proj = findProject(toEdit.id);
    proj.name = project_name.value;
    projModal.classList.remove("open");
    hideEditForm();
    changeProject(proj);
    populateStorage();
  });
}

const taskForm = document.getElementById("task-form");

function createTasks() {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTask = taskFactory(
      task_title.value,
      task_details.value,
      due_date.value,
      priority.value,
    );
    addTaskToProj(newTask);
    taskForm.reset();
    taskModal.classList.remove("open");
  });
}

function addTaskToProj(task) {
  let project = projModule.getProj();
  project.array.push(task);
  renderTasks();
  populateStorage();
}

function renderTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  let project = projModule.getProj();
  if (project.array.length == 0) {
    return;
  }
  project.array.forEach(function (task) {
    const taskItem = document.createElement("li");
    taskItem.id = task.title;
    render(task, taskItem);
    todoList.appendChild(taskItem);
    createEditBtn(taskItem);
    createDeleteBtn(taskItem);
  });
  checkboxEvent();
}

const render = function (obj, node) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";
  node.appendChild(checkbox);

  const p = document.createElement("p");
  p.innerHTML = obj.title;
  node.appendChild(p);

  const span = document.createElement("span");
  span.innerHTML = convertDate(obj.dueDate);
  node.appendChild(span);

  const starIcon = document.createElement("i");
  starIcon.classList.add("fi-sr-star");
  node.appendChild(starIcon);

  if (obj.priority == "Low") {
    starIcon.classList.add("low");
  } else if (obj.priority == "Medium") {
    starIcon.classList.add("medium");
  } else if (obj.priority == "High") {
    starIcon.classList.add("high");
  }
};

function checkboxEvent() {
  const checkbox = document.getElementById("checkbox");

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      this.parentNode.classList.add("strikethrough");
    } else {
      this.parentNode.classList.remove("strikethrough");
    }
  });
}

function createDeleteBtn(item) {
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fi-br-cross");
  //deleteIcon.setAttribute('src', '../src/imgs/cross.svg')
  item.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", function (e) {
    if (e.target.closest("ul").id == "todo-list") {
      deleteTask(item);
    } else if (e.target.closest("ul").id == "project-list") {
      deleteProject(item);
    }
  });
}

function createEditBtn(item) {
  const editIcon = document.createElement("i");
  editIcon.classList.add("fi-rr-edit");
  item.appendChild(editIcon);

  editIcon.addEventListener("click", function (e) {
    if (e.target.closest("ul").id == "todo-list") {
      editTask(item);
    } else if (e.target.closest("ul").id == "project-list") {
      editProject(item);
    }
  });
}

function editTask(toEdit) {
  showEditForm();
  taskModal.classList.add("open");
  let taskObj = findTask(toEdit.id);
  task_title.value = taskObj.title;
  task_details.value = taskObj.details;
  due_date.value = taskObj.dueDate;
  priority.value = taskObj.priority;

  editTaskBtn.addEventListener("click", function () {
    taskObj.title = task_title.value;
    taskObj.details = task_details.value;
    taskObj.dueDate = due_date.value;
    taskObj.priority = priority.value;
    taskModal.classList.remove("open");
    hideEditForm();
    renderTasks();
    populateStorage();
  });
}

function findTask(title) {
  let project = projModule.getProj();
  return project.array.find((task) => task.title === title);
}

function deleteTask(toRemove) {
  let project = projModule.getProj();
  const index = project.array.map((e) => e.title).indexOf(toRemove);
  project.array.splice(index, 1);
  renderTasks();
  populateStorage();
}

//change dueDate format - e.g, 08-Mar
const convertDate = function (dateString) {
  const date = format(parseISO(dateString), "dd-MMM");
  return date;
};

const submitProjBtn = document.getElementById("submit_proj_btn");
const editProjBtn = document.getElementById("edit_proj_btn");
editProjBtn.classList.add("hide-btn");
const submitTaskBtn = document.getElementById("submit_task_btn");
const editTaskBtn = document.getElementById("edit_task_btn");
editTaskBtn.classList.add("hide-btn");

function showEditForm() {
  editProjBtn.classList.remove("hide-btn");
  editTaskBtn.classList.remove("hide-btn");
  submitProjBtn.classList.add("hide-btn");
  submitTaskBtn.classList.add("hide-btn");
}

function hideEditForm() {
  editProjBtn.classList.add("hide-btn");
  editTaskBtn.classList.add("hide-btn");
  submitProjBtn.classList.remove("hide-btn");
  submitTaskBtn.classList.remove("hide-btn");
}

const openProjBtn = document.getElementById("openProjModal");
const closeProjBtn = document.getElementById("closeProjModal");
const projModal = document.getElementById("projModal");

openProjBtn.addEventListener("click", () => {
  projModal.classList.add("open");
  projectForm.reset();
});

closeProjBtn.addEventListener("click", () => {
  projModal.classList.remove("open");
  hideEditForm();
});

const openTaskBtn = document.getElementById("openTaskModal");
const closeTaskBtn = document.getElementById("closeTaskModal");
const taskModal = document.getElementById("taskModal");

openTaskBtn.addEventListener("click", () => {
  taskModal.classList.add("open");
  taskForm.reset();
});

closeTaskBtn.addEventListener("click", () => {
  taskModal.classList.remove("open");
  hideEditForm();
});

export { createTasks, createProjects, createDefaultProj, init };
