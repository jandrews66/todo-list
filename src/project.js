import { renderTasks, renderProjects, changeProject } from './dom.js'


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

const defaultProject = projectFactory("default");

export {
    selectedProject,
    createProjects,
    projectArray
}