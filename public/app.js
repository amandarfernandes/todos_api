$(function(){
$
    .getJSON("api/todos")
    .then(addTodos);

$('#todoInput').on('keypress', function (event) {
    if (event.which === 13) {
        createTodo();
    }
});

$('.list')
    .on('click', 'li', function () {
        //removeTodo($(this).parent());
        updateTodo($(this));
    });

$('.list').on('click', 'span', function(event) {
    event.stopPropagation();
    removeTodo($(this).parent());
    
});

});
function updateTodo(todo){
    var updateURL= 'api/todos/'+todo.data('id');
    var isDone = !todo.data('completed');

     $.ajax({
        method: 'PUT',
        url: updateURL,
        data:{completed:isDone}
        })
        .then(function (data) {
            console.log(data);
            todo.data('completed', isDone);
            todo.toggleClass('done');
        })
        .catch(function (err) {
            console.log(err);
        });
        
}

function removeTodo(todo) {
    var deleteURL = 'api/todos/' + todo.data('id');
    $.ajax({method: 'DELETE', url: deleteURL})
        .then(function (data) {
            console.log(data);
            todo.remove();
        })
        .catch(function (err) {
            console.log(err);
        });
    

}
function createTodo() {
    $.post('api/todos', {
            name: $('#todoInput').val()
        })
        .then(function (newTodo) {
            console.log(newTodo);
            addTask(newTodo);
            $('#todoInput').val('');
        })
        .catch(function (err) {
            console.log(err);
        });
}

function addTodos(todos) {
    todos
        .forEach(function (todo) {
            addTask(todo);

        });
}

function addTask(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    //console.log(newTodo.data('completed'));
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}