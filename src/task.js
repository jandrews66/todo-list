import { format, parseISO } from "date-fns"

const taskFactory = (title, details, dueDate, priority) => {

    let task = {};
    task.title = title
    task.details = details
    task.dueDate = convertDate(dueDate)
    task.priority = priority

    return { 
        title,
        details,
        dueDate,
        priority
    }
}

//change dueDate format - e.g, 08-Mar
const convertDate = function(dateString){
    const date = (format(parseISO(dateString), "dd-MMM"));
    return date
}

export {taskFactory}