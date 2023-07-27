const container = document.getElementById("container")
const tasksDisplay = document.getElementById("tasksDisplay")
const myModal = document.getElementById("myModal")
const overlay = document.getElementById("overlay")
const addBtn = document.getElementById("addBtn")
const submitBtn = document.getElementById("submitBtn")
const leftBarBtn = document.getElementById("leftBarBtn")
const leftBarDiv = document.getElementById("leftBarDiv")
const tasks = []

// Force JS date format at the end so all dates are consistant.
// 2002-12-22 is the format that modal puts in the div right now
// change "date" to deadline everywhere to avoid confusion with keyword "date". Later.

const completeTask = () => { // Before this, set up the Archive section
    
}
// Should ideally be able to change the Task, deadline (nothing for progress required)
const updateTasks = () => {
    
}
const handleDoneCheckBox = () => {
    // When Done is clicked, the row should move to Archive
}
const handleArchiveBtn = () => {
    // This Archive button is in left nav bar

}

const taskFactory = (task, date, progress) => { // working.
    return { task, date, progress };
}
const closeAddTaskModal = () => { // working.
    myModal.classList.add("hidden")
    overlay.classList.add("hidden")
}
const resetTaskModal = (task, date, progress) => { // working.
    task.value = ""
    date.value = ""
    progress.value = ""
    task.placeholder = "Task"
    progress.value = "notStarted"
}
const addTask = (task, date, progress) => { // working.
    const taskRow = taskFactory(task, date, progress)
    tasks.push(taskRow)
    addTaskToDom(taskRow)
}
const addTaskToDom = (taskRow) => { // working.
    const newRow = document.createElement("div")
    const task = document.createElement("div")
    const date = document.createElement("div")
    const progress = document.createElement("div")
    const done = document.createElement("input")
    done.setAttribute("type", "checkbox")

    newRow.classList.add("row")
    task.classList.add("task")
    task.textContent = taskRow.task
    date.classList.add("date")
    date.textContent = taskRow.date
    progress.classList.add("progress")
    if (taskRow.progress === "Not Started")
        progress.classList.add("notStarted")
    else
        progress.classList.add("inProgress")
    progress.textContent = taskRow.progress // progress.value won't work cause the thing is not a dropdown in the final row. Need to remove dropdown to avoid confusion or add it there as well
    done.classList.add("done")
    // done.checked = false // This will always be false when adding a new value. No need to default, already defaults to unchecked

    newRow.appendChild(task)
    newRow.appendChild(date)
    newRow.appendChild(progress)
    newRow.appendChild(done)
    tasksDisplay.appendChild(newRow)
}
const handleSubmitBtn = () => { // working.
    const task = document.getElementById("task")
    const date = document.getElementById("date")
    const progress = document.getElementById("progress")
 
    if (task.value === "" || date.value === null || date.value === undefined) {
        alert("Both Task and Date are mandatory fields.")
        return
    }

    addTask(task.value, date.value, progress.value)
    closeAddTaskModal()
    resetTaskModal(task, date, progress)
}
const handleAddBtn = () => { // working. // Does a method make sense?
    myModal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}
const changeProgress = (e) => { // Working // But very ugly code?
    if (e.target.classList[0] === "progress" && e.target.parentNode.classList[1] !== "rowHeader") {
        if (e.target.textContent === "In Progress") {
            e.target.textContent = "Not Started"
            e.target.classList.remove("inProgress")
            e.target.classList.add("notStarted")
        } else {
            e.target.textContent = "In Progress"
            e.target.classList.remove("notStarted")
            e.target.classList.add("inProgress")
        } 
    } else return
}



const handleLeftNavBtn = () => { // Working on this right now

}
const setUpPage  = () => {
    addTask("Meet Suzy", "2023-08-22", "Not Started")

    addBtn.addEventListener("click", handleAddBtn)

    tasksDisplay.addEventListener("click", (e) => {
        changeProgress(e) 
    })

    leftBarBtn.addEventListener("click", () => {
        const logoText = document.getElementById("logoText")
        const archive = document.getElementById("archive")
        const project = document.getElementById("project")
        if (leftBarDiv.id === "leftBarDiv") {
            leftBarDiv.setAttribute("id", "expandedLeftBar")
            logoText.classList.remove("hidden")
            archive.classList.remove("hidden")
            project.classList.remove("hidden")
        } else {
            leftBarDiv.setAttribute("id", "leftBarDiv")
            logoText.classList.add("hidden")
            archive.classList.add("hidden")
            project.classList.add("hidden")
        }  
    })



    // It constantly checks for EVERY key even if I add it to a different method. Sad. lol.
    document.addEventListener("keydown", (e) => {
        console.log(e.key) // Delete this at the end
        if (e.key === "Escape") closeAddTaskModal()
    })

    submitBtn.addEventListener("click", handleSubmitBtn)
}
setUpPage()