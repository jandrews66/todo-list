import './style.css';
import { createTasks } from './dom.js'
import { createProjects, createDefaultProj } from './dom.js';

function controller(){

    createDefaultProj();
    createTasks();
    createProjects();

}

controller();