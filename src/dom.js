import { selectedProject, projectArray, changeProject } from './project.js';

const openProjBtn = document.getElementById("openProjModal");
const closeProjBtn = document.getElementById("closeProjModal");
const projModal = document.getElementById("projModal")

openProjBtn.addEventListener("click", () => {
    projModal.classList.add("open")
});

closeProjBtn.addEventListener("click", () => {
    projModal.classList.remove("open")
});

const openTaskBtn = document.getElementById("openTaskModal");
const closeTaskBtn = document.getElementById("closeTaskModal");
const taskModal = document.getElementById("taskModal")

openTaskBtn.addEventListener("click", () => {
    taskModal.classList.add("open")
});

closeTaskBtn.addEventListener("click", () => {
    taskModal.classList.remove("open")
});

const todoList = document.getElementById("todo-list")

function renderTasks(){
    let project = selectedProject.array
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
        projectItem.classList.add("project")
        projectItem.innerHTML = project.name
        projectList.appendChild(projectItem);
        createDeleteBtn(projectItem)
        createEditBtn(projectItem)
    });
    selectProject()

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
        // if (e.target.closest("ul").id == "todo-list"){
        //     deleteTask(item)
        // } else if (e.target.closest("ul").id == "project-list"){
        //     deleteProject(item)
        // }
        editProject(item)
    })
}

function editProject(toEdit){
    projModal.classList.add("open")
    project_name.value = toEdit.id

}

function deleteTask(toRemove){

    const index = selectedProject.array.map(e => e.title).indexOf(toRemove)
    selectedProject.array.splice(index, 1)
    renderTasks()
}

function deleteProject(toRemove){

    const index = projectArray.map(e => e.title).indexOf(toRemove)
    projectArray.splice(index, 1)
    renderProjects();
}

function selectProject(){

    const projectList = document.querySelectorAll(".project")
    projectList.forEach(project => {
        project.addEventListener("click", function(e){
            findProject(e.target.id)
        });
    });
    function findProject(name){
        let project = projectArray.find(project => project.name = name)
        changeProject(project)
    }
}


const projHeading = document.getElementById("selected-project")

function updateProjectHeading(projectName){
    projHeading.innerHTML = "Current Project: " + projectName

}

/// create function that uses the selected <li> from a click event and searches for the object and returns it. Perhaps use dataset, if type is project then search project array for example

export {renderTasks, renderProjects, updateProjectHeading}