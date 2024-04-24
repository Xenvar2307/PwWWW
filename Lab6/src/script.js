
$(document).ready(function(){
    $('#przycisk').click(
           function(e){
            console.log('A kuku');
            getBitcoinPrice(e) ;    
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
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) { 
            if (this.status == 200) {
                console.log(xhttp.responseText) 
                let response = JSON.parse(xhttp.responseText);
                console.log(response.bpi[currency].rate)
            } else {
                alert("Błąd podczas pobierania kursu: "+ xhttp.responseText)
            }   
        };
    }    
    xhttp.open("GET", baseUrl + currency, true);
    xhttp.send();
    console.log("getBitcoinPrice() end") 
}   

const todoUrl = 'https://api.restful-api.dev/objects';

let todoDb = {
    "id" : "abcd1234",
    name: "My TODOs",
    data: {
        nextId:0,
        todo:[],
        done:[]
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
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) { 
            if (this.status == 200) {
                console.log(xhttp.responseText) 
                todoDb = JSON.parse(xhttp.responseText);
                dbIdElement.value = todoDb.id;
            } else {
                alert("Błąd podczas pobierania bazy: "+ xhttp.responseText)
            }   
        };
    }   
    xhttp.open("POST", todoUrl, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(todoDb));
}

function loadTodoList(dbId) {
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) { 
            if (this.status == 200) {
                console.log(xhttp.responseText) 
                todoDb = JSON.parse(xhttp.responseText);
                dbIdElement.value = todoDb.id;
            } else {
                alert("Błąd podczas pobierania bazy: "+ xhttp.responseText)
            }   
        };
    }   
    xhttp.open("GET", todoUrl + "/" + dbId, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();    
}


function addTask() {
    let desc = document.getElementById("taskName").value;
    let newId = todoDb.nextId++;
    todoDb.data.todo.push({id: newId, desc: desc});
    saveDb();
}

function saveDb() {
    let xhttp = new XMLHttpRequest();
        
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) { 
            if (this.status == 200) {
                console.log(xhttp.responseText) 
                todoDb = JSON.parse(xhttp.responseText);
                dbIdElement.value = todoDb.id;
            } else {
                alert("Błąd podczas pobierania bazy: "+ xhttp.responseText)
            }   
        };
    }   
    xhttp.open("PUT", todoUrl + "/" + todoDb.id, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(todoDb));
}