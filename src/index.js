import './style.css';
import { createTasks } from './task.js'
import { createProjects } from './project.js';

function controller(){

    createTasks();
    createProjects();

}

controller();
