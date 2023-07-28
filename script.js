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
// const allUL = Array.from(projectPage.getElementsByClassName("projectUL"))
// Can access directly in foreach element.textContent for abvoe array

const tasks = []

const taskFactory = (task, date, progress) => {
    return { task, date, progress };
}
const closeAddTaskModal = () => {
    myModal.classList.add("hidden")
    overlay.classList.add("hidden")
}
const resetTaskModal = (task, date, progressCheckBox) => {
    task.value = ""
    date.value = ""
    progressCheckBox.value = ""
    task.placeholder = "Task"
    progressCheckBox.value = "notStarted"
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
    resetTaskModal(task, date, progressCheckBox)
}
const handleAddBtn = () => {
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
const handleHomeBtn = () => {
    tasksDisplay.classList.add("tasksDisplay")
    tasksDisplay.classList.remove("hidden")
    archiveDiv.classList.add("hidden")
    archiveDiv.classList.remove("tasksDisplay")
    projectPage.classList.remove("projectPage")
    projectPage.classList.add("hidden")
    projectModal.classList.add("hidden")
    projectModal.classList.remove("projectPage")
    selectedProject.classList.remove("projectPage")
    selectedProject.classList.add("hidden")
}
const handleArchiveBtn = () => {
    tasksDisplay.classList.add("hidden")
    tasksDisplay.classList.remove("tasksDisplay")
    archiveDiv.classList.add("tasksDisplay")
    archiveDiv.classList.remove("hidden")
    projectPage.classList.remove("projectPage")
    projectPage.classList.add("hidden")
    projectModal.classList.add("hidden")
    projectModal.classList.remove("projectPage")
    selectedProject.classList.remove("projectPage")
    selectedProject.classList.add("hidden")
        
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
const handleProjectBtn = () => {
    tasksDisplay.classList.add("hidden")
    tasksDisplay.classList.remove("tasksDisplay")
    archiveDiv.classList.add("hidden")
    archiveDiv.classList.remove("tasksDisplay")
    projectPage.classList.add("projectPage")
    projectPage.classList.remove("hidden")

    projectModal.classList.add("hidden")
    projectModal.classList.remove("projectPage")
    selectedProject.classList.remove("projectPage")
    selectedProject.classList.add("hidden")
        
}
const handleAddProjectBtn = () => {
    projectModal.classList.remove("hidden")
    projectModal.classList.add("projectPage")
    projectPage.classList.remove("projectPage")
    projectPage.classList.add("hidden")
    tasksDisplay.classList.add("hidden")
    tasksDisplay.classList.remove("tasksDisplay")
    archiveDiv.classList.add("hidden")
    archiveDiv.classList.remove("tasksDisplay")
    selectedProject.classList.remove("projectPage")
    selectedProject.classList.add("hidden")
}
const addProjectToProjectDom = () => { // Adds project to the Project page with no tasks yet
    const li = document.createElement("li")
    const projectName = document.getElementById("projectName")
    if (projectName.value === "") {
        alert("Project Name is mandatory.")
        return
    }
    li.textContent = projectName.value
    // li.classList.add("projectUL") 
    projectListDisplay.appendChild(li)
    closeProjectModal()
    resetProjectModal(projectName)
}
const closeProjectModal = () => {
    projectModal.classList.add("hidden")
    projectModal.classList.remove("projectPage")
}
const resetProjectModal = (projectName) => {
    projectName.value = ""
    projectName.placeholder = "New Project"
}

const projectPageSetUp = () => {
    // If you click the radio box, it should cross the task
    // Add option to delete (with confirm) the task, since not adding projects to storage right now
    // This delete option should be on projectListDisplay page (right side of each project name), update addProjectToProjectDom for this.

    addProjectBtn.addEventListener("click", () => {
        // Open up a small modal on the page (no overlay) that takes Project name
        handleAddProjectBtn()
    })
    projectFormBtn.addEventListener("click", () => {
        addProjectToProjectDom()
    })

    // e.currentTarget is giving whole projectListDisplay div object with all children
    // e.target is giving the clicked ul - we can use this easily
    projectListDisplay.addEventListener("click", (e) => {
        console.log(e.target.textContent) // It can be used for Title of new page I guess?
        selectedProjectDisplay()
        selectedProjectDOM(e)
    })

    
    
}

const addTaskToProject = () => {

}
const selectedProjectDisplay = () => { // Switches over to the selected Project page, but has nothing inside
    selectedProject.classList.remove("hidden")
    selectedProject.classList.add("projectPage")
    projectModal.classList.remove("projectPage")
    projectModal.classList.add("hidden")
    projectPage.classList.remove("projectPage")
    projectPage.classList.add("hidden")
    tasksDisplay.classList.add("hidden")
    tasksDisplay.classList.remove("tasksDisplay")
    archiveDiv.classList.add("hidden")
    archiveDiv.classList.remove("tasksDisplay")
}
const selectedProjectDOM = (e) => { // Maybe club this with above one after cleaning up yucky code
    projectHeading.textContent = e.target.textContent

    addTaskToProjectBtn.addEventListener("click", () => {
        addTaskProjectModal.classList.add("projectPage")
        addTaskProjectModal.classList.remove("hidden")
        selectedProject.classList.add("hidden")
        selectedProject.classList.remove("projectPage")
        projectModal.classList.remove("projectPage")
        projectModal.classList.add("hidden")
        projectPage.classList.remove("projectPage")
        projectPage.classList.add("hidden")
        tasksDisplay.classList.add("hidden")
        tasksDisplay.classList.remove("tasksDisplay")
        archiveDiv.classList.add("hidden")
        archiveDiv.classList.remove("tasksDisplay")
    })

    taskFormBtn.addEventListener("click", () => {
        const li = document.createElement("li")
        const taskName = document.getElementById("taskName")
        if (taskName.value === "") {
            alert(`Task is mandatory, click "Project" in left bar if you want to go back.`)
            return
        }
        li.textContent = taskName.value
        // li.classList.add("projectUL")
        li.contentEditable = true // For the tasks 
        tasksInProject.appendChild(li)
        closeAddTaskProjectModal() // Working now
        resetAddTaskProjectModal(taskName) // reset not working
    })
}
const closeAddTaskProjectModal = () => {
    addTaskProjectModal.classList.add("hidden")
    addTaskProjectModal.classList.remove("projectPage")
    selectedProject.classList.remove("hidden")
    selectedProject.classList.add("projectPage")
}
const resetAddTaskProjectModal = (taskName) => {
    taskName.value = ""
    taskName.placeholder = "New Task"
}

const setUpPage  = () => {
    // Delete these later
    addTask("Meet Suzy", "2023-08-22", "Not Started")
    addTask("Dance", "2023-08-22", "Not Started")
    addTask("Shower", "2022-15-09", "In Progress")
    projectPageSetUp()

    addBtn.addEventListener("click", handleAddBtn)
    homeBtn.addEventListener("click", handleHomeBtn)
    archiveBtn.addEventListener("click", handleArchiveBtn)
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
    projectBtn.addEventListener("click", handleProjectBtn)

}
setUpPage()