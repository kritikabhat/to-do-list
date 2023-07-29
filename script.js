// The 6 views/pages - separate modals and pages
const tasksDisplay = document.getElementById("tasksDisplay") // Home page
const addTaskProjectModal = document.getElementById("addTaskProjectModal") // Modal with Form to add task
const selectedProject = document.getElementById("selectedProject") // Opens page where you can click "Add" to add tasks to project
const projectModal = document.getElementById("projectModal") // "Add Project" modal
const projectPage = document.getElementById("projectPage") // Displays all current projects
const archiveDiv = document.getElementById("archiveDiv") // Archive page
const myModal = document.getElementById("myModal") // The modal that opens after clicking "+ Task" in header

// All buttons
const addBtn = document.getElementById("addBtn") // Btn in header "+ Task"
const submitBtn = document.getElementById("submitBtn") // Btn in the modal after "+ Task"
const homeBtn = document.getElementById("homeBtn") // Back to Home page
const archiveBtn = document.getElementById("archiveBtn") // To archive page

const taskFormBtn = document.getElementById("taskFormBtn") // Submits "Add New Task" form
const projectBtn = document.getElementById("projectBtn") // Submits "Add Task to Project" form
const addProjectBtn = document.getElementById("addProjectBtn") // Opens "Add new project" modal
const projectFormBtn = document.getElementById("projectFormBtn") // Btn "Add" in the page after "+ Project"

// Containers within pages
const projectListDisplay = document.getElementById("projectListDisplay")
const tasksInProject = document.getElementById("tasksInProject")
const leftBar = document.getElementById("leftBar")


const projectDetails = document.getElementsByClassName("projectDetails")

let project
const projectDetailList = selectedProject.children // Used to loop through projects in selectedProject 



/**
 * Rename above variables. But don't touch the index yet. 
 * That can be done later (since CSS also needs to be changed.)
 */

const tasks = []
const taskFactory = (task, date, progress) => { // Done
    return { task, date, progress };
}
const hideAllPages = () => { // Done
    addTaskProjectModal.classList.add("hidden")
    selectedProject.classList.add("hidden")
    projectModal.classList.add("hidden")
    projectPage.classList.add("hidden")
    tasksDisplay.classList.add("hidden")
    archiveDiv.classList.add("hidden")
    myModal.classList.add("hidden")
}
const makeSelectedPageVisible = (selectedPage) => { // Done
    selectedPage.classList.remove("hidden")
}
const resetInput = (inputName, placeHolderValue) => { // Done
    inputName.value = ""
    inputName.placeholder = placeHolderValue
}
const resetTaskInputs = (date, checkBox) => { // Done
    checkBox.value = "notStarted"
    date.value = ""
}
const closeAddTaskModal = () => {  // Done // This one is used in 2 places, so keep.
    myModal.classList.add("hidden")
    makeSelectedPageVisible(tasksDisplay)
}




// Not refactored yet
const addTask = (task, date, progress) => {
    const taskRow = taskFactory(task, date, progress)
    tasks.push(taskRow) // Add to tasks[]
    addTaskToDom(taskRow)
}
const handleSubmitBtn = () => {
    const task = document.getElementById("task")
    const date = document.getElementById("date")
    const progressCheckBox = document.getElementById("progressCheckBox")
    let progress
    if (task.value === "" || date.value === null || date.value === undefined) {
        alert("Both Task and Date are mandatory fields.")
        return
    }
    progress = (progressCheckBox.value === "notStarted") ? "Not Started" : "In Progress"
    addTask(task.value, date.value, progress)
    closeAddTaskModal()
    resetInput(task, "Task")
    resetTaskInputs(date, progressCheckBox)
}
const changeProgress = (e) => {
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
    archiveDiv.appendChild(newRow)
}
const addTaskToDom = (taskRow) => {
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
    tasksDisplay.appendChild(newRow)
}
const unArchiveTask = (e) => {
    const homeRows = tasksDisplay.children
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
const addProjectToProjectDom = () => { /* Need to add a trash can next to each project, easier now that they are divs */
    let div = document.createElement("div")
    const projectName = document.getElementById("projectName")
    if (projectName.value === "") {
        alert("Project Name is mandatory.")
        return
    }
    div.textContent = projectName.value
    div.classList.add("pageRow")
    projectListDisplay.appendChild(div)

// This adds projectDetails for each new project. pageHeader gets the project name. Also a button "+ Add Task"
// Can move all these to a separate method or something later

    div = document.createElement("div")
    div.classList.add("projectDetails")
    div.classList.add("hidden")

    let childDiv = document.createElement("div")
    childDiv = document.createElement("div")
    childDiv.classList.add("pageHeader")
    childDiv.textContent = projectName.value
    div.appendChild(childDiv)

    childDiv = document.createElement("div")
    childDiv = document.createElement("div")
    childDiv.classList.add("tasksInProject")
    div.appendChild(childDiv)
    
    childDiv = document.createElement("button")
    childDiv.classList.add("button")
    childDiv.classList.add("addTaskToProjectBtn") // There is no styling with this.
    childDiv.textContent = "+ Add Task"
    div.appendChild(childDiv)

    childDiv = document.createElement("button") // Add back button to make visiblity thing easier
    childDiv.classList.add("button")
    childDiv.classList.add("back") // There is no styling with this.
    childDiv.textContent = "Back"
    div.appendChild(childDiv)

    selectedProject.appendChild(div)

    hideAllPages()
    makeSelectedPageVisible(projectPage)
    resetInput(projectName, "New Project")
}
const hideAllProjects = () => {
    for (let i = 0; i < projectDetailList.length; i++) {
        projectDetailList[i].classList.add("hidden")
    } 
}

let j = 0
const selectedProjectDOM = (e) => {
    for (let i = 0; i < projectDetailList.length; i++) {
        if (e.target.textContent === projectDetailList[i].firstChild.textContent) {
            project = projectDetailList[i]
            // This works. Now only the selected project page is visible!!!!
            makeSelectedPageVisible(projectDetailList[i])
        }
    }

    taskFormBtn.addEventListener("click", () => {
        const div = document.createElement("div")
        const taskName = document.getElementById("taskName")
        div.textContent = taskName.value
        div.contentEditable = true
        div.classList.add("pageRow")
        for (let i = 0; i < projectDetailList.length; i++) {
            if (projectDetailList[i] === project) {
                selectedProject.children[i].children[1].appendChild(div)
                hideAllPages()
                hideAllProjects()
                makeSelectedPageVisible(selectedProject)
                makeSelectedPageVisible(selectedProject.children[i]) 
                resetInput(taskName, "New Task")
            }
        }
    })
}

const projectPageSetUp = () => {
    document.addEventListener("click", (e) => {
        if (e.target.id === "homeBtn") {
            hideAllPages()
            makeSelectedPageVisible(tasksDisplay)
        } else if (e.target.id === "archiveBtn") {
            hideAllPages()
            makeSelectedPageVisible(archiveDiv)
        } else if (e.target.id === "projectBtn") {
            hideAllPages()
            makeSelectedPageVisible(projectPage)
            hideAllProjects() // Need to call hideAllProjects(projectDetailList) here.
        } else if (e.target.id === "addProjectBtn") {
            hideAllPages()
            makeSelectedPageVisible(projectModal)
        } else if (e.target.id === "projectFormBtn") {
            addProjectToProjectDom()
        } else if (e.target.id === "addBtn") {
            hideAllPages()
            makeSelectedPageVisible(myModal)
        } else if (e.target.id === "submitBtn") {
            handleSubmitBtn()
        } else if (e.target.textContent === "+ Add Task") {
            hideAllPages()
            makeSelectedPageVisible(addTaskProjectModal)
            // FOR NOW, THIS SELECTED event.target.parentNode projectDetails is not hidden
        } else if (e.target.textContent === "Back") {
            hideAllPages()
            makeSelectedPageVisible(projectPage)
            hideAllProjects()
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAddTaskModal()
    })
    archiveDiv.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress")
            unArchiveTask(e)
        else return
    })
    tasksDisplay.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress")
            changeProgress(e)
        else if (e.target.classList[0] === "done")
            handleDoneCheckBox(e)
        else
            return
    })
    projectListDisplay.addEventListener("click", (e) => {
        hideAllPages()
        makeSelectedPageVisible(selectedProject) // All projectDetails are hidden initially
        selectedProjectDOM(e)
    })

}
const setUpPage  = () => {
    // Delete these later
    addTask("Meet Suzy", "2023-08-22", "Not Started")
    addTask("Dance", "2023-08-22", "Not Started")
    addTask("Shower", "2022-15-09", "In Progress")
    projectPageSetUp()
}
setUpPage()