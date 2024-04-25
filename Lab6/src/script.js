
$(document).ready(function () {
    $('#przycisk').click(
        function (e) {
            console.log('A kuku');
            getBitcoinPrice(e);
            //     $.getJSON('https://api.coindesk.com/v1/bpi/currentprice/EUR.json', function(data){
            //            let waluta = "EUR";
            //            console.log('Got response: '+ JSON.stringify(data));
            //            console.log('EUR kurs: '+ data.bpi[waluta].rate_float);
            //            // console.log('Got response: '+ JSON.stringify(data));
            //        });
        }
    );
});


const baseUrl = 'https://api.coindesk.com/v1/bpi/currentprice/';

function getBitcoinPrice(e) {
    // Pobierz kod waluty
    let currency = document.getElementById("currency").value;

    console.log("getBitcoinPrice() begin")
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(xhttp.responseText)
                let response = JSON.parse(xhttp.responseText);
                console.log(response.bpi[currency].rate)
            } else {
                alert("Błąd podczas pobierania kursu: " + xhttp.responseText)
            }
        };
    }
    xhttp.open("GET", baseUrl + currency, true);
    xhttp.send();
    console.log("getBitcoinPrice() end")
}

const todoUrl = 'https://api.restful-api.dev/objects';

let todoDb = {
    //won't work, cant set id of an object in POST, it is generated automaticly
    "id": "abc123",
    //rest of data
    name: "My TODOs",
    data: {
        nextId: 0,
        todo: [],
        done: []
    }
}

const dbIdElement = document.getElementById("databaseId");

function initTodoList() {
    if (dbIdElement.value) {
        loadTodoList(dbIdElement.value);
    } else {
        createTodoList();
    }
}

function createTodoList() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(xhttp.responseText)
                todoDb = JSON.parse(xhttp.responseText);
                dbIdElement.value = todoDb.id;
            } else {
                alert("Błąd podczas pobierania bazy: " + xhttp.responseText)
            }
        };
    }
    xhttp.open("POST", todoUrl, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(todoDb));
}

function loadTodoList(dbId) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(xhttp.responseText)
                todoDb = JSON.parse(xhttp.responseText);
                dbIdElement.value = todoDb.id;
                //here load divs for loaded database
                //first add priority tasks
                todoDb.data.todo.filter(function (task) { return task.priority }).forEach(addTaskToDoDiv)
                //then add nonpriority tasks
                todoDb.data.todo.filter(function (task) { return !task.priority }).forEach(addTaskToDoDiv)
                // and done tasks
                todoDb.data.done.forEach(addTaskDoneDiv)
            } else {
                alert("Błąd podczas pobierania bazy: " + xhttp.responseText)
            }
        };
    }
    xhttp.open("GET", todoUrl + "/" + dbId, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

function addTaskToDoDiv(task) {
    const kontener = document.getElementById("To Do");
    const kontenerDone = document.getElementById("Did Do");
    const Task = createDivTask(task.desc, task.id, task.priority);

    kontener.appendChild(Task);
}

function addTaskDoneDiv(task) {
    const kontener = document.getElementById("To Do");
    const kontenerDone = document.getElementById("Did Do");
    const Task = createDivTask(task.desc, task.id, false);
    Task.classList.add("done");

    kontenerDone.appendChild(Task);
}


function addTask() {
    // add to db
    let desc = document.getElementById("taskName").value;
    let newId = todoDb.data.nextId++;
    todoDb.data.todo.push({ id: newId, desc: desc, priority: false });
    saveDb();

    //add div
    const kontener = document.getElementById("To Do");
    const kontenerDone = document.getElementById("Did Do");
    const Task = createDivTask(desc, newId, false);
    //Task.onclick = selectCard;
    kontener.appendChild(Task);
}

function createDivTask(name, id, priority) {

    const Task = document.createElement('div');
    Task.id = id;
    Task.textContent = name;
    Task.className = "task";
    if (priority) {
        Task.classList.add("priority")
    }

    Task.addEventListener("dblclick", function (event) {
        const kontener = document.getElementById("To Do");
        const kontenerDone = document.getElementById("Did Do")
        if (kontener.contains(Task)) {
            // here add/remove priority to db too
            if (Task.classList.contains("priority")) {
                Task.classList.remove("priority");
                todoDb.data.todo.find(function (task) { return (task.id == Task.id); }).priority = false;
                saveDb();
                kontener.appendChild(Task)
            } else {
                Task.classList.add("priority")
                todoDb.data.todo.find(function (task) { return (task.id == Task.id); }).priority = true;
                saveDb();
                kontener.insertBefore(Task, kontener.firstElementChild)
            }
        }
    })

    const btn2 = document.createElement("button");
    btn2.textContent = "Done";
    btn2.onclick = () => {
        //here move to another list in db too
        const kontener = document.getElementById("To Do");
        const kontenerDone = document.getElementById("Did Do")
        if (!kontenerDone.contains(Task)) {
            Task.classList.add("done");
            Task.classList.remove("priority")
            kontenerDone.appendChild(Task);

            moved_task = (todoDb.data.todo.find(function (task) { return (task.id == Task.id); }))
            moved_task.priority = false;
            todoDb.data.done.push(moved_task)
            todoDb.data.todo.splice(todoDb.data.todo.indexOf(moved_task), 1)
            saveDb();
        }
    }
    Task.appendChild(btn2);

    const btn1 = document.createElement("button");
    btn1.textContent = "Delete";
    btn1.onclick = () => {
        //remove from db too
        const kontener = document.getElementById("To Do");
        const kontenerDone = document.getElementById("Did Do")
        if (kontener.contains(Task)) {
            removed_task = (todoDb.data.todo.find(function (task) { return (task.id == Task.id); }))
            todoDb.data.todo.splice(todoDb.data.done.indexOf(removed_task), 1)
            saveDb();
            kontener.removeChild(Task);
        }
        else {
            removed_task = (todoDb.data.done.find(function (task) { return (task.id == Task.id); }))
            todoDb.data.done.splice(todoDb.data.done.indexOf(removed_task), 1)
            saveDb();
            kontenerDone.removeChild(Task);
        }
    }
    Task.appendChild(btn1);

    return Task;
}

//POTENTIAL ERROR, when actions happen fast, sometimes previous save is done after future save,
// resulting in overriding current data with previous state of data from past save

function saveDb() {
    // check for interuption?
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(xhttp.responseText)
                todoDb = JSON.parse(xhttp.responseText);
                dbIdElement.value = todoDb.id;
            } else {
                alert("Błąd podczas pobierania bazy: " + xhttp.responseText)
            }
        };
    }
    xhttp.open("PUT", todoUrl + "/" + todoDb.id, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(todoDb));
}