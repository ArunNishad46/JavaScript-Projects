const input = document.querySelector('#input-task')
const addButton = document.querySelector('#add-btn')
const addButtonText = addButton.innerText
const todoList = document.querySelector('#task-container')
let edit_index = null

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addButton.onclick = () => {
    const task = input.value;
    if(task === ""){
        return;
    }
    if(edit_index !== null){
        tasks.splice(edit_index, 1, {'task' : task})
        edit_index = null
    }else{
        tasks.push({'task' : task});
    }
    saveTask(tasks);
    input.value = '';
    addButton.innerText = addButtonText
}

function saveTask(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks))
    displaytask();
}

function displaytask(){
    let list = "";
    tasks.forEach((item, index) => {
        list += `
            <li class="task">
                <p>${item.task}</p>
                <div class="action">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="task-menu">
                        <li>
                            <i id="edit" class="fa-solid fa-pen-to-square" onclick='editTask(${index})'></i>
                            <i id="delete" class="fa-solid fa-trash" onclick='deleteTask(${index})'></i>
                        </li>
                    </ul>
                </div>
            </li>
        `
    });
    todoList.innerHTML = list;
}
displaytask()

function editTask(index){
    edit_index = index;
    input.value = tasks[index].task;
    addButton.innerText = "Edit"
}

function deleteTask(index){
    tasks.splice(index, 1);
    saveTask(tasks);
}

