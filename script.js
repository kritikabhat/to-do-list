const container = document.getElementById("container")
const tasksDisplay = document.getElementById("tasksDisplay")
const myModal = document.getElementById("myModal")
const overlay = document.getElementById("overlay")
const addBtn = document.getElementById("addBtn")
const submitBtn = document.getElementById("submitBtn")
const projectBtn = document.getElementById("projectBtn")
const archiveBtn = document.getElementById("archiveBtn")
const homeBtn = document.getElementById("homeBtn")
const archiveDiv = document.getElementById("archiveDiv")
const tasks = []

const handleProjectBtn = () => { // Open up new section again

}

const taskFactory = (task, date, progress) => { // working.
    return { task, date, progress };
}
const closeAddTaskModal = () => { // working.
    myModal.classList.add("hidden")
    overlay.classList.add("hidden")
}
const resetTaskModal = (task, date, progressCheckBox) => { // working.
    task.value = ""
    date.value = ""
    progressCheckBox.value = ""
    task.placeholder = "Task"
    progressCheckBox.value = "notStarted"
}
const addTask = (task, date, progress) => { // working.
    const taskRow = taskFactory(task, date, progress)
    tasks.push(taskRow)
    addTaskToDom(taskRow)
}
const handleSubmitBtn = () => { // working.
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
const handleAddBtn = () => { // working. // Does a method make sense?
    myModal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}
const changeProgress = (e) => { // Working // But very ugly code?
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
const handleHomeBtn = () => { // working
    tasksDisplay.classList.add("tasksDisplay")
    tasksDisplay.classList.remove("hidden")
    archiveDiv.classList.add("hidden")
    archiveDiv.classList.remove("tasksDisplay")
}
const handleArchiveBtn = () => { // Working
    tasksDisplay.classList.add("hidden")
    tasksDisplay.classList.remove("tasksDisplay")
    archiveDiv.classList.add("tasksDisplay")
}
const handleDoneCheckBox = (e) => { // Working. "Hidden" on the row, move to Archive, delete from "tasks" storage
    if (e.target.checked === true) { 
        e.target.parentNode.classList.add("hidden")
        e.target.parentNode.classList.remove("row")  
    }
    const children = e.target.parentNode.children
    let arr = []

    for (const child of children) { // arr=["Clean", "2023-09-17", "In Progress", "some undefined crap i dont care about"]
        arr.push(child.textContent)
    }
    const taskRow = taskFactory(arr[0], arr[1], "Complete")

    // Delete from store
    for (let i = 0; i < tasks.length; i++) {
       if (tasks[i].task === taskRow.task) tasks.splice(i, 1)
    }
    moveToArchive(taskRow)
}
const moveToArchive = (taskRow) => { // Working. Moves rows to Archive section. 
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
    newRow.classList.add("row")
    archiveDiv.appendChild(newRow)
}
const addTaskToDom = (taskRow) => { // Working.
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

    taskDetail = document.createElement("input") // For done
    taskDetail.setAttribute("type", "checkbox")
    taskDetail.classList.add("done")
    newRow.appendChild(taskDetail)

    newRow.classList.add("row")
    tasksDisplay.appendChild(newRow)
}
const setUpPage  = () => {
    addTask("Meet Suzy", "2023-08-22", "Not Started") // Setting up with one task
    addBtn.addEventListener("click", handleAddBtn)
    homeBtn.addEventListener("click", handleHomeBtn)
    archiveBtn.addEventListener("click", handleArchiveBtn)
    submitBtn.addEventListener("click", handleSubmitBtn)
    tasksDisplay.addEventListener("click", (e) => {
        if (e.target.classList[0] === "progress" && e.target.parentNode.classList[0] !== "rowHeader")
            changeProgress(e)
        else if (e.target.classList[0] === "done" && e.target.parentNode.classList[0] !== "rowHeader")
            handleDoneCheckBox(e)
        else
            return
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAddTaskModal()
    })   
}
setUpPage()