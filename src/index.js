import './style.css';


//factory function to create todos
const todoFactory = (title, details, dueDate, priority) => {
    return { title, details, dueDate, priority }
};

const projectFactory = (name) => {
    const array = [];
    return { name, array }
}
const todoArray = [];
const projectArray = [];

const defaultProject = projectFactory("Default Project")
projectArray.push(defaultProject)

let selectedProject = defaultProject;
//selectedProject.classList.add("selected-project");



function createProject(){
    const projectForm = document.getElementById('createProject');
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newProject = projectFactory(project_name.value)
        projectArray.push(newProject)
        selectedProject = newProject
        domController().displayProjects();
        form.reset();
    })
    return {selectedProject}
}

createProject();

function createTodos(){


    const form = document.getElementById('form');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //create new todo from form data
        const newTodo = todoFactory(todo_title.value, todo_details.value, due_date.value, priority.value)
        selectedProject.array.push(newTodo)
        console.log(selectedProject)
        domController().displayTodos();
        form.reset();
    })

    //const myTodo = todoFactory("blah", "wash and dry", "tomorrow", "high")
    //todoArray.push(myTodo);

    // const newTodo3 = todoFactory("Job Search", "check online and newspapers", "today", "high")
    // todoArray.push(newTodo3);

    // const newTodo2 = todoFactory("asd blsadlasd", "check dasdsaonline and newspapers", "todasdsday", "high")
    // todoArray.push(newTodo2);

    return { todoArray };
}
 createTodos();

function domController(){
    //get container for todos
    const todoList = document.getElementById("todo-list")
    //get array

    function displayTodos(){
        //const array = createTodos().todoArray

        //clear dom of todos
        while (todoList.firstChild) {
            todoList.firstChild.remove();
          }
          //loop through array to display todos
        selectedProject.array.forEach(function (todo) {
            const todoItem = document.createElement("li")
            todoItem.classList.add("todo");
            todoItem.id = todo.title
            todoList.appendChild(todoItem);
            todoItem.textContent = todo.title + " Priority: " + todo.priority
            createDeleteBtn(todoItem)
        });
    }

    displayTodos();

    const projectList = document.getElementById("project-list")

    function displayProjects(){
        //const array = createTodos().todoArray

        //clear dom of todos
        while (projectList.firstChild) {
            projectList.firstChild.remove();
          }
          //loop through array to display todos
        projectArray.forEach(function (project) {
            const projectItem = document.createElement("li")
            projectItem.id = project.name
            projectList.appendChild(projectItem);
            projectItem.textContent = project.name
            createDeleteBtn(projectItem)
        });
    }
    displayProjects();

    //create delete button for todos
    function createDeleteBtn(item) {

        const removeBtn = document.createElement("button")
        removeBtn.innerHTML = "Remove"
        removeBtn.classList.add("remove-btn")
        item.appendChild(removeBtn)
        removeBtn.addEventListener('click', function(e) {
            deleteTodo(e.target.closest("li"))
        })
    }
    //function to remove a todo from the array and call displayTodos to refresh todo list
    function deleteTodo(toRemove) {
        const index = selectedProject.array.map(e => e.title).indexOf(toRemove.id)
        selectedProject.array.splice(index, 1)
        displayTodos();
    }
    return { displayTodos, displayProjects }
}

domController();


