import { renderProjects, updateProjectHeading, renderTasks } from './dom.js'



const projectArray = [];
let selectedProject = ""


const projectFactory = (name) => {
    let project = {};
    const array = [];
    project.name = name;
    project.array = array

    projectArray.push(project)
    changeProject(project)
    return { 
        name, 
        array,

    }
}

function changeProject(project){
    selectedProject = project;
    renderTasks()
    updateProjectHeading(selectedProject.name)
    return {selectedProject}
}

const projectForm = document.getElementById('project-form')

function createProjects(){

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        projectFactory(project_name.value)
        projectForm.reset();
        renderProjects();
    })

}

const defaultProject = projectFactory("default");
renderProjects();

export {
    selectedProject,
    createProjects,
    projectArray,
    projectForm,
    changeProject
}