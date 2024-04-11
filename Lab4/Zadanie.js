function addTask() {
    const kontener = document.getElementById("To Do");
    const kontenerDone = document.getElementById("Did Do");
    const Task = document.createElement('div');
    Task.textContent = document.getElementById("in_task_name").value;
    Task.className = "task";
    //Task.onclick = selectCard;
    kontener.appendChild(Task);

    Task.addEventListener("dblclick", function (event) {
        if (kontener.contains(Task)) {
            if (Task.classList.contains("priority")) {
                Task.classList.remove("priority");
                kontener.appendChild(Task)
            } else {
                Task.classList.add("priority")
                kontener.insertBefore(Task, kontener.firstElementChild)
            }
        }
    })

    const btn2 = document.createElement("button");
    btn2.textContent = "Done";
    btn2.onclick = () => {
        if (!kontenerDone.contains(Task)) {
            Task.classList.add("done");
            kontenerDone.appendChild(Task);
        }
    }
    Task.appendChild(btn2);

    const btn1 = document.createElement("button");
    btn1.textContent = "Delete";
    btn1.onclick = () => {
        if (kontener.contains(Task))
            kontener.removeChild(Task);
        else
            kontenerDone.removeChild(Task);
    }
    Task.appendChild(btn1);


}