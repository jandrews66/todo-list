import { selectedProject, projectArray } from './project.js';

const todoList = document.getElementById("todo-list")

function renderTasks(project){
    todoList.innerHTML = "";
    project.forEach(function (task) {
        const taskItem = document.createElement("li")
        taskItem.id = task.title
        render(task, taskItem)
        todoList.appendChild(taskItem);
        createDeleteBtn(taskItem)
    });
}

const render = function(obj, node){
    let values = Object.values(obj)
    node.innerHTML = values
}

const projectList = document.getElementById("project-list")

function renderProjects(){
    projectList.innerHTML = "";

    projectArray.forEach(function (project) {
        const projectItem = document.createElement("li")
        projectItem.id = project.name
        projectItem.innerHTML = project.name
        projectList.appendChild(projectItem);
        createDeleteBtn(projectItem)
    });
}

const projHeading = document.getElementById("selected-project")

function changeProject(project){
    projHeading.innerHTML = "Current Project: " + project.name
    selectedProject = project
    renderTasks(selectedProject.array)
}

function createDeleteBtn(item) {

    const removeBtn = document.createElement("button")
    removeBtn.innerHTML = "Remove"
    removeBtn.classList.add("remove-btn")
    item.appendChild(removeBtn)
    
    removeBtn.addEventListener('click', function(e) {
        if (e.target.closest("ul").id == "todo-list"){
            deleteTask(item)
        } else if (e.target.closest("ul").id == "project-list"){
            deleteProject(item)
        }
    })
}

function deleteTask(toRemove){

    const index = selectedProject.array.map(e => e.title).indexOf(toRemove)
    selectedProject.array.splice(index, 1)
    renderTasks(selectedProject.array)
}

function deleteProject(toRemove){

    const index = projectArray.map(e => e.title).indexOf(toRemove)
    projectArray.splice(index, 1)
    renderProjects();
}


export {renderTasks, renderProjects, changeProject}