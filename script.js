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
const addTaskToProjectBtn = document.getElementById("addTaskToProjectBtn") // Opens "Add New task" to project modal
const taskFormBtn = document.getElementById("taskFormBtn") // Submits "Add New Task" form
const projectBtn = document.getElementById("projectBtn") // Submits "Add Task to Project" form
const addProjectBtn = document.getElementById("addProjectBtn") // Opens "Add new project" modal
const projectFormBtn = document.getElementById("projectFormBtn") // Btn "Add" in the page after "+ Project"

// Containers within pages
const projectListDisplay = document.getElementById("projectListDisplay")
const projectHeading = document.getElementById("projectHeading")
const tasksInProject = document.getElementById("tasksInProject")
const leftBar = document.getElementById("leftBar")

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
    const div = document.createElement("div")
    const projectName = document.getElementById("projectName")
    if (projectName.value === "") {
        alert("Project Name is mandatory.")
        return
    }
    div.textContent = projectName.value
    div.classList.add("pageRow")
    projectListDisplay.appendChild(div)
    hideAllPages()
    makeSelectedPageVisible(projectPage)
    resetInput(projectName, "New Project")
}
const selectedProjectDOM = (e) => {
    projectHeading.textContent = e.target.textContent
    addTaskToProjectBtn.addEventListener("click", () => { // Refactored
        hideAllPages()
        makeSelectedPageVisible(addTaskProjectModal)
    })
    taskFormBtn.addEventListener("click", () => {
        const div = document.createElement("div")
        const taskName = document.getElementById("taskName")
        if (taskName.value === "") {
            alert(`Task is mandatory.`)
            return
        }
        div.textContent = taskName.value
        div.contentEditable = true
        div.classList.add("pageRow")
        tasksInProject.appendChild(div)
        hideAllPages()
        makeSelectedPageVisible(selectedProject)
        resetInput(taskName, "New Task")
    })
}
const projectPageSetUp = () => {// Can add more event listeners here, maybe even create commmon event listener method
    addProjectBtn.addEventListener("click", () => {
        hideAllPages()
        makeSelectedPageVisible(projectModal)
    })
    projectFormBtn.addEventListener("click", () => {
        addProjectToProjectDom()
    })
    projectListDisplay.addEventListener("click", (e) => {
        hideAllPages()
        makeSelectedPageVisible(selectedProject)
        selectedProjectDOM(e)
    })
    addBtn.addEventListener("click", () => {
        hideAllPages()
        makeSelectedPageVisible(myModal)
    })
    homeBtn.addEventListener("click", () => {// Refactored
        hideAllPages()
        makeSelectedPageVisible(tasksDisplay)
    })
    archiveBtn.addEventListener("click", () => { // Refactored
        hideAllPages()
        makeSelectedPageVisible(archiveDiv)
    })
    submitBtn.addEventListener("click", handleSubmitBtn)
    tasksDisplay.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress")
            changeProgress(e)
        else if (e.target.classList[0] === "done")
            handleDoneCheckBox(e)
        else
            return
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAddTaskModal()
    })
    archiveDiv.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress")
            unArchiveTask(e)
        else return
    })
    projectBtn.addEventListener("click", () => { // Refactored
        hideAllPages()
        makeSelectedPageVisible(projectPage)
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