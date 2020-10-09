'use strict'

console.log('Hi');


function onInit() {
    renderTodos();
}


function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();
    if(todos.length === 0){
        checkTodoFilter(gFilterBy);
        return
    }
    todos.forEach(function(todo){
        strHTML += 
        `<li class="${(todo.isDone)? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button class="btn btn-danger my-2" type="button" onclick="onRemoveTodo(event,'${todo.id}')">x</button>
        </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTML;

    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewImportene = document.querySelector('.importent');
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var txt = elNewTodoTxt.value;
    if(txt === '') return;
    var impotrent = elNewImportene.value;
    addTodo(txt,impotrent);
    renderTodos();
    elNewTodoTxt.value = '';
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    if(!confirm('you want do delete?')) return;
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetBysort(sortBy){
    setSort(sortBy);
    renderTodos();
}

function checkTodoFilter(filter){
    var elLiText = document.querySelector('.todo-list');
    switch (filter) {
        case 'ALL':
            elLiText.innerHTML = 'No Todos';
            break;
        case 'ACTIVE':
            elLiText.innerHTML = 'No Active Todos';
            break;
        case 'DONE':
            elLiText.innerHTML = 'No Done Todos';
            break;
    
        default:
            break;
    }
}