let todoCounter = 0;

function addNewTodo() {
    todoCounter = localStorage.length;
    let todoText = document.getElementById("new-todo").value;


    // check whether something is in input or not
    if(todoText !== "") {
        createNewTodo(todoText, -1);
    } else {
        // we'll do it later
    }

    document.getElementById("new-todo").value = "";
}

// creates some nodes to append in the todo area
function createNewTodo(text, fetchId) {

    let parentContainer = document.getElementById("todo-cnt");

    // clear the previous content if there is no node
    if(parentContainer.innerText === "Add some notes...") {
        parentContainer.innerText = "";
        parentContainer.classList.remove("todo-cnt-center");
    }

    let contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("class", "content-wrapper");

    // create a container to store your todo text
    let todoContainer = document.createElement("div");
    todoContainer.setAttribute("class", "todo-node");
    todoContainer.setAttribute("id", "todo-node" + (fetchId===-1?todoCounter:fetchId));
    
    let checkBox = document.createElement("input")
    checkBox.setAttribute("id", "complete-todo");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "todo" + (fetchId===-1?todoCounter:fetchId));
    if(fetchId !== -1) {
        console.log("data retruveibg..")
        if(JSON.parse(localStorage.getItem("todo-node" + fetchId)).completed) {
            checkBox.checked = true;
        } else {
            checkBox.checked = false;
        }
    }
    todoContainer.append(checkBox)
    
    let labelConatiner = document.createElement("label");
    labelConatiner.setAttribute("for", "todo" + (fetchId===-1?todoCounter:fetchId));
    labelConatiner.setAttribute("id", "todoText" + (fetchId===-1?todoCounter:fetchId));
    labelConatiner.setAttribute("class", fetchId===-1?'': JSON.parse(localStorage.getItem("todo-node" + fetchId)).completed ? 'completed-task': '')
    labelConatiner.setAttribute("onclick", "updateTodoStatus(this.id)")
    labelConatiner.append(document.createTextNode(text));
    todoContainer.append(labelConatiner)
     
        // edit wrappper
    let editWrapper = document.createElement("div");
    editWrapper.setAttribute("class", "edit-wrapper");

    // delete button
    let deleteButton = document.createElement("button");
    deleteButton.append(document.createTextNode("Delete"));
    // add event listener to delete button
    deleteButton.addEventListener("click", function() {
    deleteTodoNode(todoContainer.id);
  });
    editWrapper.append(deleteButton);
    contentWrapper.append(checkBox, labelConatiner, editWrapper);

    let timeContainer = document.createElement("div");
    timeContainer.setAttribute("class", "time-cnt");

    
    // normally adding without fetching...
    if(fetchId === -1){
        let date = new Date().toLocaleDateString("de-DE");
        
        // object of a particular todo
        let myTodo = {
            text: text, 
            completed: false, 
            time: date 
        }
        timeContainer.append(document.createTextNode(date));
        localStorage.setItem("todo-node" + todoCounter, JSON.stringify(myTodo))
        
        todoCounter += 1;
    } 
    else 
        timeContainer.append(document.createTextNode(JSON.parse(localStorage.getItem("todo-node" + fetchId)).time));

    // append the todo in the container
    todoContainer.append(contentWrapper);
    todoContainer.append(timeContainer);
    parentContainer.append(todoContainer);
}

function updateTodoStatus(id) {
    let todoID = document.getElementById(id).parentNode.parentNode.id;
    let currentTodo = JSON.parse(localStorage.getItem(todoID));

    if(document.getElementById(id).classList.value == '') {
        document.getElementById(id).classList.add('completed-task');
        currentTodo.completed = true;
    } else {
        document.getElementById(id).classList.remove('completed-task');
        currentTodo.completed = false;

    }
    localStorage.setItem(todoID, JSON.stringify(currentTodo));
}


function fetchingData() {
    for(let i=0; i<localStorage.length; i++){
        let data = JSON.parse(localStorage.getItem("todo-node" + i));
        createNewTodo(data.text, i);
    }
}
function deleteTodoNode(id) {
    // remove the node from the DOM
    let todoNode = document.getElementById(id);
    todoNode.parentNode.removeChild(todoNode);
  
    // remove the item from local storage
    localStorage.removeItem(id);
  }
  
fetchingData();