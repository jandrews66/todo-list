import { projectFactory } from './project.js';
import { taskFactory } from './task.js'

const projectArray = [];


function createDefaultProj(){
    const defaultProj = projectFactory("default")
    addProjectToArray(defaultProj)
    projModule.setProj(defaultProj);
    updateProjectHeading(defaultProj.name)
    renderProjects();
}

const openProjBtn = document.getElementById("openProjModal");
const closeProjBtn = document.getElementById("closeProjModal");
const projModal = document.getElementById("projModal")

openProjBtn.addEventListener("click", () => {
    projModal.classList.add("open")
    projectForm.reset();

});

closeProjBtn.addEventListener("click", () => {
    projModal.classList.remove("open")
    hideEditForm();
});

const openTaskBtn = document.getElementById("openTaskModal");
const closeTaskBtn = document.getElementById("closeTaskModal");
const taskModal = document.getElementById("taskModal")

openTaskBtn.addEventListener("click", () => {
    taskModal.classList.add("open")
});

closeTaskBtn.addEventListener("click", () => {
    taskModal.classList.remove("open")
    hideEditForm();
});

function createTasks(){

    const taskForm = document.getElementById('task-form')
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let newTask = taskFactory(task_title.value, task_details.value, due_date.value, priority.value)
        addTaskToProj(newTask)
        taskForm.reset();
    })

}

function addTaskToProj(task){
    let project = projModule.getProj()
    project.array.push(task)
    renderTasks()
}

function renderTasks(){
    const todoList = document.getElementById("todo-list")
    todoList.innerHTML = "";
    let project = projModule.getProj()
    project.array.forEach(function (task) {
        const taskItem = document.createElement("li")
        taskItem.id = task.title
        render(task, taskItem)
        todoList.appendChild(taskItem);
        createDeleteBtn(taskItem)
        createEditBtn(taskItem)
    });
    

}

const render = function(obj, node){
    let values = Object.values(obj)
    node.innerHTML = values
}
const projectForm = document.getElementById('project-form')

function createProjects(){

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let newProj = projectFactory(project_name.value)
        addProjectToArray(newProj)
        changeProject(newProj)
        projectForm.reset();

    })

}

function addProjectToArray(proj){
    projectArray.push(proj)

}

const projModule = {
    selectedProj: '',
    setProj: function(newProj){
        this.selectedProj = newProj;
    },
    getProj: function(){
        return this.selectedProj
    },

}

function renderProjects(){
    const projectList = document.getElementById("project-list")
    projectList.innerHTML = "";
    projectArray.forEach(function (project) {
        const projectItem = document.createElement("li")
        projectItem.id = project.name
        projectItem.classList.add("project")
        projectItem.innerHTML = project.name
        projectList.appendChild(projectItem);
        createDeleteBtn(projectItem)
        createEditBtn(projectItem)
    });
    renderTasks();
    selectProject();
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

function createEditBtn(item) {

    const editBtn = document.createElement("button")
    editBtn.innerHTML = "Edit"
    editBtn.classList.add("edit-btn")
    item.appendChild(editBtn)
    
    editBtn.addEventListener('click', function(e) {
        if (e.target.closest("ul").id == "todo-list"){
            editTask(item)
        } else if (e.target.closest("ul").id == "project-list"){
            editProject(item)
        }

    })
}

const submitBtn = document.getElementById("submit_btn")
const editProjBtn = document.getElementById("edit_btn")
editProjBtn.classList.add("hide-btn")


function showEditForm(){
    editProjBtn.classList.remove("hide-btn")
        submitBtn.classList.add("hide-btn")
}

function hideEditForm(){
    editProjBtn.classList.add("hide-btn")
        submitBtn.classList.remove("hide-btn")
}
function editProject(toEdit){
    showEditForm();
    projModal.classList.add("open")
    project_name.value = toEdit.id

    editProjBtn.addEventListener('click', function(){
        let proj = findProject(toEdit.id)
        proj.name = project_name.value
        projModal.classList.remove("open")
        hideEditForm()
        changeProject(proj)


    })

}

const editTaskBtn = document.getElementById("edit_task_btn")
editTaskBtn.classList.add("hide-btn")


function editTask(toEdit){
    showEditForm();
    taskModal.classList.add("open")
    let taskObj = findTask(toEdit.id)
    task_title.value = taskObj.title
    task_details.value = taskObj.details
    due_date.value = taskObj.dueDate
    priority.value = taskObj.priority

    editTaskBtn.addEventListener('click', function(){
        taskObj.title = task_title.value
        taskObj.details = task_details.value
        taskObj.dueDate = due_date.value
        taskObj.priority = priority.value  
        taskModal.classList.remove("open")
        hideEditForm()
        renderTasks();
        
    })

}

function findTask(title){
    let project = projModule.getProj()
    return project.array.find(task => task.title === title)
}

function deleteTask(toRemove){

    let project = projModule.getProj()
    const index = project.array.map(e => e.title).indexOf(toRemove)
    project.array.splice(index, 1)
    renderTasks()
}

function deleteProject(toRemove){
    let proj = findProject(toRemove.id)
    const index = projectArray.indexOf(proj)
    projectArray.splice(index, 1)
    let newIndex = index - 1
    if (projectArray.length == 0){
        changeProject("");
    } else {
        changeProject(projectArray[newIndex])
    }
}

function selectProject(){

    const projectList = document.querySelectorAll(".project")
    projectList.forEach(project => {
        project.addEventListener("click", function(e){
            if (e.target.id == false){
                return
            } else { 
                let proj = findProject(e.target.id)
                changeProject(proj)
            }
        });
    });
}

function findProject(name){
    return projectArray.find(project => project.name === name)
}

function changeProject(proj){
    projModule.setProj(proj)
    updateProjectHeading(proj.name)
    renderProjects();
}


function updateProjectHeading(projectName){
    const projHeading = document.getElementById("selected-project")
    projHeading.innerHTML = "Current Project: " + projectName

}

export {createTasks, createProjects, createDefaultProj}