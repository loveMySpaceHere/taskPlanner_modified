// function createCardHTML(id, name, assign, description, date, status) {
//     const html = `<div class="col" >
//     <div class="card" >
//         <div class="card-body">
//           <h5 class="card-title">${name}</h5>
//           <h6 class="card-subtitle mb-2 text-muted">${assign}</h6>
//           <p class="card-text">${description}</p>
//           <p>${assign}<br> ${date} <br> ${status}</p>
//           <input type="submit" class="btn btn-secondary" value="Edit">
//     <input type="reset" class="btn btn-danger" value="Delete">
//         </div>
//       </div>
//   </div> <br>`;
//   return html;
// }



class TaskManager {
    constructor(taskId = 0) {
        this._tasks = [];
        this._tasksbyStatus = [];
        this._taskId = taskId;
        this._myStorage = window.localStorage;
    }
    get tasks() {
        return this._tasks;
    }

    getCurrentTask() {
        if( this._tasks.length > 0) {
            return this._tasks[this._tasks.length - 1];
        }
    }

    displayCardsbyStatus(look) {
        this._tasksbyStatus = this._tasks.filter(x => x.assign == look)
         return this._tasksbyStatus;
         }
      
    addTask(taskName, taskAssign, taskDescription, taskDate, taskStatus) {
            const task = {
            taskId:  ++this._taskId,
            name:   taskName,
            assign: taskAssign, 
            description: taskDescription, 
            date: taskDate, 
            status: taskStatus
            }
        this._tasks.push(task);
        
    }

    deleteTask(taskId) {
        this._tasks = this._tasks.filter(x => x.taskId != taskId);
    }

    editTask(taskId) {
        this._editCurrenttask = this._tasks.filter( x => x.taskId == taskId)

    }

    getTask(id) {
        return this._tasks.find(x => x.taskId == id);
    }

    saveFile() {
        this._myStorage.setItem('tasks', JSON.stringify(this._tasks));
    }

    loadFile() {
        const tasks = this._myStorage.getItem('tasks');
        if(tasks) {
            this._tasks = JSON.parse(tasks);
        }

    }

}



        // console.log(typeof this._tasks[0].taskId + ' ' + typeof(taskId));
        // console.log(this._tasks[0].taskId + ' ' + taskId);
        // if(this._tasks[0].taskId == taskId){
        //     console.log(`Matched ${this._tasks}`);
        // }
        // this._tasksbyStatus = this._tasks.filter(x => x._taskId == taskId)
        // console.log(`Filtered array is ${this._tasksbyStatus}`);
        // return this._tasksbyStatus;
