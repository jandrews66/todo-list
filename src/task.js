const taskFactory = (title, details, dueDate, priority) => {

    let task = {};
    task.title = title
    task.details = details
    task.dueDate = dueDate
    task.priority = priority

    return { 
        title,
        details,
        dueDate,
        priority
    }
}

export {taskFactory}