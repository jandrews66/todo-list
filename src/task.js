import { selectedProject } from './project.js';
import { renderTasks } from './dom.js'


const taskFactory = (title, details, project) => {

    let task = {};
    task.title = title
    task.details = details
    const addTask = () => project.push(task)
    addTask();

    return { 
        task,
        title,
        details,
        project
    }
}

function createTasks(){

    const taskForm = document.getElementById('task-form')
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        taskFactory(task_title.value, task_details.value, selectedProject.array)
        taskForm.reset();
        renderTasks(selectedProject.array)
    })

}



export {taskFactory, createTasks}