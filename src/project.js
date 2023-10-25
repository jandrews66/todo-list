
const projectFactory = (name) => {
    let project = {};
    const array = [];
    project.name = name;
    project.array = array

    return { 
        name, 
        array,

    }
}

export {
    projectFactory
}