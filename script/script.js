let todos = [];

function validateForm(todo, date) {
    if (todo.trim() === '' || date === '') {
        return false;
    }
    return true;
}

/// Function to add a new todo item
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('due-date').value;

    if (!validateForm(todoInput, todoDate)) {
        alert('Please fill in all fields.');
    } else {

        console.log('Schedule Added:', todoInput, 'Due date:', todoDate);
  
        todos.push({ task: todoInput, dueDate: todoDate });

        renderTodos();

        console.log('Current Schedule: ', todos);
        alert('Schedule added successfully!');

        // Clear input fields after adding
        document.getElementById('todo-input').value = '';
        document.getElementById('due-date').value = '';
    }
}

/// Placeholder function for future feature
function deleteTodo() {

}

/// Placeholder functions for future features
function filterTodo() {

}


function renderTodos() {

    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        todoList.innerHTML += `<li>
            <span>${todo.task} - Due: ${todo.dueDate}</span>
        </li>`;
    });
}
