//Selecting elements from index.html 

const taskName = document.querySelector("#task-name");
const taskAssignedto = document.querySelector("#task-assignedto");
const taskDescription = document.querySelector("#task-description");
const taskDate = document.querySelector("#task-date");
const taskStatus = document.querySelector("#task-status");
const taskSubmit = document.querySelector("#task-submit");
const taskReset = document.querySelector("#task-reset");
const taskSave = document.getElementById("task-save");
const spanError = document.getElementsByClassName("err-task");
const taskSearch = document.querySelector("#task-search");
const textSearch = document.querySelector("#text-search");
const cardContainer = document.getElementsByClassName("card-container")[0];

const todoContainer = document.getElementsByClassName("todo")[0]

const progressContainer = document.getElementsByClassName("in-progress")[0]

const reviewContainer = document.getElementsByClassName("review")[0]

const doneContainer = document.getElementsByClassName("done")[0] 

// console.log(cardContainer.innerHTML);
// Declaring variables to store form field values

let nameData,
    assignedtoData,
    descriptionData,
    dateData,
    statusData;
    
let btnEnableArray = [0,0,0,0,0]



//To display error message
function errMsg(parentElement, spanElement, errMessage)      
    { 
        spanElement.innerHTML = errMessage;
        spanElement.style.color = 'red';
        parentElement.style.border = '1px solid red';
    }

//To display success message
function errMsgReset(parentElement, spanElement, successMessage)
    {   
        spanElement.innerHTML = successMessage;
        spanElement.style.color = 'Green';
        parentElement.style.border = '1px solid black';
    }


/* Applying event listeners on input fields */

taskName.addEventListener("focusout", () => {
    nameData = taskName.value;
    if (nameData.length < 5) {
            btnEnableArray[0] = 0;
            errMessage = "   Enter alteast 5 letters";
            spanElement = spanError[0];
            taskSubmit.disabled = true;
            errMsg(taskName, spanElement, errMessage );
            }
    else {
        successMessage = "  Go to next Step";
        spanElement = spanError[0];
        errMsgReset(taskName, spanElement, successMessage)
        btnEnableArray[0] = 1;
        chk = btnEnableArray[0] + btnEnableArray[1] + btnEnableArray[2] + btnEnableArray[3] + btnEnableArray[4]
        if (chk === 5) {
            taskSubmit.disabled = false;
        }

    }
    
})

taskAssignedto.addEventListener("focusout", () => {
    assignedtoData = taskAssignedto.value;
    if (assignedtoData.length < 5) {
            btnEnableArray[1] = 0;
            errMessage = "   Enter alteast 5 letters";
            spanElement = spanError[1];
            taskSubmit.disabled = true;
            errMsg(taskAssignedto,spanElement, errMessage );
    }
    else {
            successMessage = "  Go to next Step";
            spanElement = spanError[1];
            errMsgReset(taskAssignedto, spanElement, successMessage);
            btnEnableArray[1] = 1;
            chk = btnEnableArray[0] + btnEnableArray[1] + btnEnableArray[2] + btnEnableArray[3] + btnEnableArray[4]
            if (chk === 5) {
                 taskSubmit.disabled = false;
                }

    }
})

taskDescription.addEventListener("focusout", () => {
    descriptionData = taskDescription.value;
    if (descriptionData.length < 5) {
        btnEnableArray[2] = 0;
        errMessage = "   Enter alteast 5 letters";
        spanElement = spanError[2];
        taskSubmit.disabled = true;
        errMsg(taskDescription,spanElement, errMessage );
    }
    else {
        successMessage = "  Go to next Step";
        spanElement = spanError[2];
        errMsgReset(taskDescription, spanElement, successMessage);
        btnEnableArray[2] = 1;
        chk = btnEnableArray[0] + btnEnableArray[1] + btnEnableArray[2] + btnEnableArray[3] + btnEnableArray[4]
        if (chk === 5) {
            taskSubmit.disabled = false;
        }

    }
})


taskDate.onclick = () => {
    // alert(dateData);
    let now = new Date();
    // alert(now);
    let month = now.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let date = now.getDate();
    // alert(date);
    if( date < 10) {
        date =  "0"+ date;
    }
    // let currentDate = now.getFullYear() + "-" + month + "-" + now.getDate();
    let currentDate = now.getFullYear() + "-" + month + "-" + date;
    // alert(currentDate);
    taskDate.setAttribute("min", currentDate);
};



taskDate.addEventListener("focusout", () => {
    dateData = taskDate.value;
    // alert(taskDate.value);
    if (!dateData) {
        btnEnableArray[3] = 0;
        errMessage = "   Enter correct date";
        spanElement = spanError[3];
        taskSubmit.disabled = true;
        errMsg(taskDate, spanElement, errMessage );
    }
    else {
        successMessage = "  Go to next Step";
        spanElement = spanError[3];
        errMsgReset(taskDate, spanElement, successMessage);
        btnEnableArray[3] = 1;
        chk = btnEnableArray[0] + btnEnableArray[1] + btnEnableArray[2] + btnEnableArray[3] + btnEnableArray[4]
        if (chk === 5) {
            taskSubmit.disabled = false;
        }
    }
    
})

taskStatus.addEventListener("focusout", () => {
    statusData = taskStatus.value;
    // alert(taskDate.value);
    if (statusData === "Select...") {
        btnEnableArray[4] = 0;
        errMessage = "Choose";
        spanElement = spanError[4];
        taskSubmit.disabled = true;
        errMsg(taskAssignedto, spanElement, errMessage );   
    }
    else {
        successMessage = "  Good to Add Task";
        spanElement = spanError[4];
        errMsgReset(taskDate, spanElement, successMessage);
        btnEnableArray[4] = 1;
        chk = btnEnableArray[0] + btnEnableArray[1] + btnEnableArray[2] + btnEnableArray[3] + btnEnableArray[4]
            if (chk === 5) {
            taskSubmit.disabled = false;
        }
    }
})


// Instantiate Object

const myTask = new TaskManager();

function validFormFieldInput(event) {
        myTask.addTask(
        nameData,
        assignedtoData,
        descriptionData,
        dateData,
        statusData
    );
    myTask.saveFile();
    createCard(event);
}

function resetValues() {
    alert('resetValues');
    taskName.value = ''; 
    taskAssign.value = '';
    taskDescription.value = '';
    taskDate.value = '';
    taskStatus.value = 'Select...';
}
  

                              
function createCard(event) {
    event.preventDefault(); 
    let card = document.createElement("div");
    let currentTask = myTask.getCurrentTask();
    card.innerHTML = render(currentTask);
    columnDecider(currentTask, card);
    // cardContainer.appendChild(card);
}

function columnDecider(anyTask, card)
{
    if(anyTask.status === "To Do..") 
        todoContainer.appendChild(card);
    else if(anyTask.status === 'In Progress') 
        progressContainer.appendChild(card);
    else if(anyTask.status === 'Review') 
        reviewContainer.appendChild(card);
     else if(anyTask.status === 'Done') 
        doneContainer.appendChild(card)
}
  
// let temp = document.getElementsByClassName("card-container")        
function render(task) {    
    let cardLayout =`<div class="card">
            <div class="card-body">
            <h5 class="card-title">${task.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${task.assign}</h6>
            <p class="card-text">${task.description}</p>
            <p>${task.assign} <br> ${task.date} <br> ${task.status}</p>
            <input type="submit" card-id=${task.taskId} onclick="editTask(this)" data-bs-toggle="modal" data-bs-target= "#exampleModal" class="btn btn-secondary" value="Edit">
            <input type="reset" card-id=${task.taskId} onclick="deleteTask(this)" class="btn btn-danger" value="Delete">
        </div>
        </div>`
        return cardLayout;
    }

    

//To delete a card 
function deleteTask(e) {
    // alert(e.getAttribute("card-id"));
    // console.log(e);
    iD = e.getAttribute("card-id");
    myTask.deleteTask(iD);
    cardContainer.innerHTML = ' ';
    myTask.tasks.forEach(task => {   
        let card = document.createElement("div");
        card.innerHTML = render(task);
        console.log(card.innerHTML)
        cardContainer.appendChild(card);
    })

}

//To edit a card 
// Transferring the card details to form for editting

function editTask(e) {
    iD = e.getAttribute("card-id");
    const myEditTask = myTask.getTask(iD);
    // console.log(myEditTask);
    taskSubmit.style.display = 'none';
    taskReset.style.display = 'none';
    taskSave.style.display = 'block';
    taskName.value = myEditTask.name;
    taskAssignedto.value = myEditTask.assign;
    taskDescription.value = myEditTask.description;
    taskStatus.value = myEditTask.status;
    taskDate.value = myEditTask.date;

// Tranferring the edited form back to the array and then card
    taskSave.addEventListener('click', ()=>{
        myEditTask.name = taskName.value;
        myEditTask.description = taskDescription.value;
        myEditTask.assign = taskAssignedto.value;
        myEditTask.status = taskStatus.value;
        displayAfterEdit();
        // ediitedTask = myTask.getTask(iD);
        // console.log(ediitedTask);
        // location.reload();
    })
    
}
function displayAfterEdit ()
{
cardContainer.innerHTML = ' ';
myTask.tasks.forEach(task => {   
    let card = document.createElement("div");
    card.innerHTML = render(task);
    // console.log(card.innerHTML)
    cardContainer.appendChild(card);
    })
}





 //To display cards based on the search


//  To enable the search button
   textSearch.addEventListener("focusout", () => {
        textData = textSearch.value;
        taskSearch.disabled = false;
    })

   
// List cards based on the assign-to name

    taskSearch.addEventListener("click", (event) => {
    event.preventDefault(); 
    let searchTask = myTask.displayCardsbyStatus(textData);
    // console.log(searchTask);
    // console.log(cardContainer.innerHTML);
    cardContainer.innerHTML = ' ';
    // todoContainer.innerHTML = ' ';
    // progressContainer.innerHTML = ' ';
    // reviewContainer.innerHTML = ' ';
    // doneContainer.innerHTML = ' ';
            searchTask.forEach(task => {   
            let card = document.createElement("div");
            card.innerHTML = render(task);
            cardContainer.appendChild(card);
            // columnDecider(task, card);
            // console.log(card.innerHTML)
        })

    })


taskSubmit.addEventListener("click", validFormFieldInput);




   /* let elements = document.getElementsByClassName("card-container")
    Array.from(elements).forEach(ele => {
        ele.style.display = 'none';
        ele.style.display = 'block';
    }) */

    



 
    

