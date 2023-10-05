import { selectedProject, projectArray } from './project.js';
import { taskFactory } from './task.js'


const todoList = document.getElementById("todo-list")


function renderTasks(project){
    todoList.innerHTML = "";
    project.forEach(function (task) {
        const taskItem = document.createElement("li")
        taskItem.id = task.title
        render(task.title, taskItem)
        todoList.appendChild(taskItem);
        createDeleteBtn(taskItem)
    });
}

const render = function(template, node){
    node.innerHTML = template
}

const projectList = document.getElementById("project-list")

function renderProjects(){
    projectList.innerHTML = "";

    projectArray.forEach(function (project) {
        const projectItem = document.createElement("li")
        projectItem.id = project.name
        projectItem.innerHTML = project.name
        projectList.appendChild(projectItem);
        ///createDeleteBtn()
    });
}

const projHeading = document.getElementById("selected-project")

function changeProject(project){
    projHeading.innerHTML = project.name
    selectedProject = project
    renderTasks(selectedProject.array)
}

function createDeleteBtn(item) {

    const removeBtn = document.createElement("button")
    removeBtn.innerHTML = "Remove"
    removeBtn.classList.add("remove-btn")
    item.appendChild(removeBtn)
    
    removeBtn.addEventListener('click', function(e) {
    deleteTask(e.target.closest("li").id)

    })
}

function deleteTask(toRemove){

    const index = selectedProject.array.map(e => e.title).indexOf(toRemove)
    selectedProject.array.splice(index, 1)
    renderTasks(selectedProject.array)
}




export {renderTasks, renderProjects, changeProject}