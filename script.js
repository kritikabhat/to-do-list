const homePage = document.getElementById("homePage")
const addTaskToProjectFormPage = document.getElementById("addTaskToProjectFormPage")
const listTasksInProjectPage = document.getElementById("listTasksInProjectPage")
const addProjectFormPage = document.getElementById("addProjectFormPage")
const listAllProjectsPage = document.getElementById("listAllProjectsPage")
const archivePage = document.getElementById("archivePage")
const addTaskHeaderFormPage = document.getElementById("addTaskHeaderFormPage")
const submitTaskProjectBtn = document.getElementById("submitTaskProjectBtn")
const listAllProjectChildContainer = document.getElementById("listAllProjectChildContainer")
const leftBar = document.getElementById("leftBar")
const projectDetails = document.getElementsByClassName("projectDetails")

const tasks = []
const projectList = listTasksInProjectPage.children
let selectedProject // Stores the latest selected project

const taskFactory = (task, date, progress) => {
    return { task, date, progress };
}
const hideAllPages = () => {
    addTaskToProjectFormPage.classList.add("hidden")
    listTasksInProjectPage.classList.add("hidden")
    addProjectFormPage.classList.add("hidden")
    listAllProjectsPage.classList.add("hidden")
    homePage.classList.add("hidden")
    archivePage.classList.add("hidden")
    addTaskHeaderFormPage.classList.add("hidden")
}
const makeSelectedPageVisible = (selectedPage) => {
    selectedPage.classList.remove("hidden")
}
const resetInput = (inputName, placeHolderValue) => {
    inputName.value = ""
    inputName.placeholder = placeHolderValue
}
const resetTaskInputs = (date, checkBox) => {
    checkBox.value = "notStarted"
    date.value = ""
}
const closeAddTaskModal = () => {
    addTaskHeaderFormPage.classList.add("hidden")
    makeSelectedPageVisible(homePage)
}
const hideAllProjects = () => {
    for (let i = 0; i < projectList.length; i++) {
        projectList[i].classList.add("hidden")
    } 
}
const findSelectedProject = (e) => {
    for (let i = 0; i < projectList.length; i++) {
        if (e.target.textContent === projectList[i].firstChild.textContent) {
            selectedProject = projectList[i]
            makeSelectedPageVisible(projectList[i])
        }
    }
}
const addTaskstoProject = () => {
    const div = document.createElement("div")
    const taskName = document.getElementById("taskName")
    if (taskName.value === "") {
        alert("Task Name is mandatory.")
        return
    }
    div.textContent = taskName.value
    div.contentEditable = true
    div.classList.add("pageRow")

    for (let i = 0; i < projectList.length; i++) {
        if (projectList[i] === selectedProject) {
            listTasksInProjectPage.children[i].children[1].appendChild(div)
            hideAllPages()
            hideAllProjects()
            makeSelectedPageVisible(listTasksInProjectPage)
            makeSelectedPageVisible(listTasksInProjectPage.children[i]) 
            resetInput(taskName, "New Task")
        }
    }
}
const addTaskToHome = (task, date, progress) => {
    const taskRow = taskFactory(task, date, progress)
    tasks.push(taskRow) // Add to tasks[]
    addTaskToHomeDOM(taskRow)
}
const changeProgressStatus = (e) => {
    if (e.target.textContent === "In Progress") {
        e.target.textContent = "Not Started"
        e.target.classList.remove("inProgress")
        e.target.classList.add("notStarted")
    } else {
        e.target.textContent = "In Progress"
        e.target.classList.remove("notStarted")
        e.target.classList.add("inProgress")
    } 
}
const addDivsForEachProject = () => {
    const div = document.createElement("div")
    div.classList.add("projectDetails")
    div.classList.add("hidden")

    let childDiv = document.createElement("div")
    childDiv.classList.add("pageHeader")
    childDiv.textContent = projectName.value
    div.appendChild(childDiv)

    childDiv = document.createElement("div")
    childDiv.classList.add("tasksInProject")
    div.appendChild(childDiv)
    
    const arr = ["+ Add Task", "Back"]
    arr.forEach(item => {
        childDiv = document.createElement("button")
        childDiv.classList.add("button")
        childDiv.classList.add("wideBtn")
        childDiv.textContent = item
        div.appendChild(childDiv)
    });

    listTasksInProjectPage.appendChild(div)
}
const moveToArchive = (taskRow) => {
    const newRow = document.createElement("div")
    let arr = ["task", "date", "progress"]
    let taskDetail
    arr.forEach(item => {
        taskDetail = document.createElement('div')
        taskDetail.classList.add(item)
        if (item === "progress")
            taskDetail.classList.add("completed")
        taskDetail.textContent = taskRow[item]
        newRow.appendChild(taskDetail)
    });
    newRow.classList.add("archiveRow")
    archivePage.appendChild(newRow)
}
const unArchive = (e) => {
    const homeRows = homePage.children
    for (const row of homeRows) {
        if (row.children[0].firstChild.textContent === e.target.parentNode.firstChild.textContent) {
            if (!confirm("Do you want to UnArchive this?"))
                return
            row.classList.remove("hidden")
            row.classList.add("row")
            row.children[3].checked = false
            e.target.parentNode.classList.add("hidden")
            e.target.parentNode.classList.remove("archiveRow")

            const taskRow = taskFactory( // Re-Add to tasks []
                e.target.parentNode.children[0].textContent, 
                e.target.parentNode.children[1].textContent, 
                "Not Started")
            tasks.push(taskRow)
        }
    }
    return
}
const addTaskToHomeDOM = (taskRow) => {
    const newRow = document.createElement("div")
    let arr = ["task", "date", "progress"]
    let taskDetail

    arr.forEach(item => {
        taskDetail = document.createElement('div')
        taskDetail.classList.add(item)
        if (item === "progress") {
            taskDetail.classList.add((taskRow[item] === "Not Started") ? "notStarted" : "inProgress")
        }
        taskDetail.textContent = taskRow[item]
        newRow.appendChild(taskDetail)
    });

    taskDetail = document.createElement("input")
    taskDetail.setAttribute("type", "checkbox")
    taskDetail.classList.add("done")
    newRow.appendChild(taskDetail)

    newRow.classList.add("row")
    homePage.appendChild(newRow)
}
const addProjectToProjectDOM = () => {
    const div = document.createElement("div")
    const projectName = document.getElementById("projectName")
    if (projectName.value === "") {
        alert("Project Name is mandatory.")
        return
    }
    div.textContent = projectName.value
    div.classList.add("pageRow")
    listAllProjectChildContainer.appendChild(div)
    addDivsForEachProject()
    hideAllPages()
    makeSelectedPageVisible(listAllProjectsPage)
    resetInput(projectName, "New Project")
}
const handleDoneCheckBox = (e) => {
    if (e.target.checked === true) { 
        e.target.parentNode.classList.add("hidden")
        e.target.parentNode.classList.remove("row")  
    }
    const children = e.target.parentNode.children
    let arr = []
    for (const child of children) {
        arr.push(child.textContent)
    }
    const taskRow = taskFactory(arr[0], arr[1], "Complete")

    for (let i = 0; i < tasks.length; i++) { // Remove from tasks[]
       if (tasks[i].task === taskRow.task) tasks.splice(i, 1)
    }
    moveToArchive(taskRow)
}
const handleSubmitTaskHomeBtn = () => {
    const task = document.getElementById("task")
    const date = document.getElementById("date")
    const progressCheckBox = document.getElementById("progressCheckBox")
    let progress
    if (task.value === "" || !date.value) {
        alert("Both Task and Date are mandatory fields.")
        return
    }
    progress = (progressCheckBox.value === "notStarted") ? "Not Started" : "In Progress"
    addTaskToHome(task.value, date.value, progress)
    closeAddTaskModal()
    resetInput(task, "Task")
    resetTaskInputs(date, progressCheckBox)
}
const setUpPage = () => {
    document.addEventListener("click", (e) => {
        if (e.target.id === "homeLeftBarBtn") {
            hideAllPages()
            makeSelectedPageVisible(homePage)
        } else if (e.target.id === "archiveLeftBarBtn") {
            hideAllPages()
            makeSelectedPageVisible(archivePage)
        } else if (e.target.id === "projectLeftBarBtn") {
            hideAllPages()
            makeSelectedPageVisible(listAllProjectsPage)
            hideAllProjects()
        } else if (e.target.id === "addProjectLeftBarBtn") {
            hideAllPages()
            makeSelectedPageVisible(addProjectFormPage)
        } else if (e.target.id === "submitNewProjectBtn") {
            addProjectToProjectDOM()
        } else if (e.target.id === "addHeaderBtn") {
            hideAllPages()
            makeSelectedPageVisible(addTaskHeaderFormPage)
        } else if (e.target.id === "submitTaskHeaderBtn") {
            handleSubmitTaskHomeBtn()
        } else if (e.target.textContent === "+ Add Task") {
            hideAllPages()
            makeSelectedPageVisible(addTaskToProjectFormPage)
        } else if (e.target.textContent === "Back") {
            hideAllPages()
            makeSelectedPageVisible(listAllProjectsPage)
            hideAllProjects()
        } else if (e.target.id === "submitTaskProjectBtn") {
            addTaskstoProject()
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAddTaskModal()
    })
    archivePage.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress")
            unArchive(e)
        else return
    })
    homePage.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress")
        changeProgressStatus(e)
        else if (e.target.classList[0] === "done")
            handleDoneCheckBox(e)
        else
            return
    })
    listAllProjectChildContainer.addEventListener("click", (e) => {
        hideAllPages()
        makeSelectedPageVisible(listTasksInProjectPage)
        findSelectedProject(e)
    })
}
setUpPage()
