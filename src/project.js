import { renderTasks } from './dom.js'


const projectArray = [];
let selectedProject = ""


const projectFactory = (name) => {
    let project = {};
    const array = [];
    project.name = name;
    project.array = array
    const addProject = () => projectArray.push(project)
    addProject()
    changeProject(project)
    return { 
        name, 
        array,

    }
}

function createProjects(){

    const projectForm = document.getElementById('project-form')
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        projectFactory(project_name.value)
        projectForm.reset();
        renderProjects();
    })

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

const defaultProject = projectFactory("default");

export {
    selectedProject,
    createProjects
}