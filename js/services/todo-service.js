const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSortBy ='CREATED';
var gTodos = _createTodos();


function getTodosForDisplay() {
    var todos;
    if (gFilterBy === 'ALL')  todos=gTodos;
    else {
    todos = gTodos.filter(function(todo){
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })} 
    sortTodos(todos);
    return todos;
}

function addTodo(txt,importent) {
    gTodos.unshift(_createTodo(txt,importent))
    saveToStorage(STORAGE_KEY, gTodos);

}

function removeTodo(id) {
    var idx = gTodos.findIndex(function(todo){
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gTodos);
}

function toggleTodo(id) {
    var todo = gTodos.find(function(todo){
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}
function setSort(sortBy){
    gSortBy = sortBy;
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function(count, todo){
        if (!todo.isDone) count +=1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function(todo){
        return !todo.isDone 
    })
    return activeTodos.length;
}

function sortTodos(todos){
    switch (gSortBy) {
        case 'TEXT':
            todos.sort(function(a, b) {
                var nameA = a.txt.toUpperCase(); 
                var nameB = b.txt.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            break;
            case 'IMPORTENT':
                todos.sort(function(a,b){
                    return a.importent - b.importent
                })
            break;
            case 'CREATED':
                todos.sort(function(a,b){
                    return a.createdAt - b.createdAt
                });
                break;
                default:
                    todos.sort(function(a,b){
                        return a.createdAt - b.createdAt
                    });
                    break;


    }
}


// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt,impotent) {
    return {
        id: makeId(),
        txt: txt,
        isDone : false,
        createdAt:Date.now(),
        importance:+impotent
    };
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML'))
        todos.push(_createTodo('Master CSS'))
        todos.push(_createTodo('Become JS Ninja'))
    }
    return todos;
}


