import { selectedProject } from './project.js';
import { renderTasks } from './dom.js'


const taskFactory = (title, details, dueDate, priority, project) => {

    let task = {};
    task.title = title
    task.details = details
    task.dueDate = dueDate
    task.priority = priority

    project.push(task)

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
        taskFactory(task_title.value, task_details.value, due_date.value, priority.value, selectedProject.array)
        taskForm.reset();
        renderTasks(selectedProject.array)
    })

}



export {taskFactory, createTasks}