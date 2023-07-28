const tasksDisplay = document.getElementById("tasksDisplay")
const myModal = document.getElementById("myModal")
const overlay = document.getElementById("overlay")
const addBtn = document.getElementById("addBtn")
const submitBtn = document.getElementById("submitBtn")
const homeBtn = document.getElementById("homeBtn")
const archiveDiv = document.getElementById("archiveDiv")
const archiveBtn = document.getElementById("archiveBtn")
const projectListDisplay = document.getElementById("projectListDisplay")
const selectedProject = document.getElementById("selectedProject")
const projectHeading = document.getElementById("projectHeading")
const addTaskToProjectBtn = document.getElementById("addTaskToProjectBtn")
const addTaskProjectModal = document.getElementById("addTaskProjectModal")
const taskFormBtn = document.getElementById("taskFormBtn")
const tasksInProject = document.getElementById("tasksInProject")
const projectPage = document.getElementById("projectPage")
const projectBtn = document.getElementById("projectBtn")
const addProjectBtn = document.getElementById("addProjectBtn")
const leftBar = document.getElementById("leftBar")
const projectModal = document.getElementById("projectModal")
const projectFormBtn = document.getElementById("projectFormBtn")
/**
 * tasksDisplay: The "Home" page
 * archiveDiv: "Archive" page uses the same class "tasksDisplay" for styling.
 * projectPage: Project page that displays all the current projects. Clsss = projectPage
 * projectModal: "Add Project" modal. Class = projectPage. 
 * When you click "Add" button (projectFormBtn) on projectModel, it should go back to projectModal
 * Above projectModal is reached by addProjectBtn in left bar
 * myModal: opens "Add task" modal from header button(addBtn). It has no class styling. Id used to style. (Can reuse this so no need to add classes at all?)
 * submitBtn is in myModal and goes back to whatever is current. It should go to tasksDisplay instead.
 * selectedProject: Selects a project and lets you add tasks to it. class=projectPage. (achieved by clicking ol in projectPage)
 * addTaskToProjectBtn: opens up addTaskProjectModal that allows to add new task to a project
 * addTaskProjectModal: class = projectPage
 *  (This is currently messed up when you click around. Fix it later.)
 * clicking taskFormBtn in addTaskToProjectBtn modal takes you back to selectedProject which shows all tasks in that project.
 * Currently, the "task is mandatory" shows even when task is added. Broken, fix later.
 */

const tasks = []
const taskFactory = (task, date, progress) => {
    return { task, date, progress };
}
const hideAllPages = () => {
    addTaskProjectModal.classList.add("hidden")
    selectedProject.classList.add("hidden")
    projectModal.classList.add("hidden")
    projectPage.classList.add("hidden")
    tasksDisplay.classList.add("hidden")
    archiveDiv.classList.add("hidden")
    myModal.classList.add("hidden")
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
const closeAddTaskModal = () => { // This one is used in 2 places, so keep.
    myModal.classList.add("hidden")
    overlay.classList.add("hidden")
}







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
const handleAddBtn = () => { // nothing to change.
    myModal.classList.remove("hidden")
    overlay.classList.remove("hidden")
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
const addProjectToProjectDom = () => { // Adds project to the Project page with no tasks yet
    const li = document.createElement("li")
    const projectName = document.getElementById("projectName")
    if (projectName.value === "") {
        alert("Project Name is mandatory.")
        return
    }
    li.textContent = projectName.value
    projectListDisplay.appendChild(li)
    // closeProjectModal()
    hideAllPages()
    makeSelectedPageVisible(projectPage)
    resetInput(projectName, "New Project")
}
const selectedProjectDOM = (e) => { // Maybe club this with above one after cleaning up yucky code
    projectHeading.textContent = e.target.textContent
    addTaskToProjectBtn.addEventListener("click", () => { // Refactored
        hideAllPages()
        makeSelectedPageVisible(addTaskProjectModal)
    })
    taskFormBtn.addEventListener("click", () => {
        const li = document.createElement("li")
        const taskName = document.getElementById("taskName")
        if (taskName.value === "") {
            alert(`Task is mandatory.`)
            return
        }
        li.textContent = taskName.value
        li.contentEditable = true
        tasksInProject.appendChild(li)
        // closeAddTaskProjectModal()
        hideAllPages()
        makeSelectedPageVisible(selectedProject)
        resetInput(taskName, "New Task")
    })
}

const projectPageSetUp = () => {// Refactored
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

    // These are from startUp initially
    addBtn.addEventListener("click", handleAddBtn)
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
    projectPageSetUp() // All event listeners moved here
}
setUpPage()