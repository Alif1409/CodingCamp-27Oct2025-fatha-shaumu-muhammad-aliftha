let todos = [];

function validateForm(todo, date) {
    if (todo.trim() === '' || date === '') {
        return false;
    }
    return true;
}

// Function to delete all todos
function deleteAllTodos() {
    todos = [];
    saveTodos();
    renderTodos();
    console.log('All schedules deleted');
}

// Function to delete a specific todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
    console.log('Schedule deleted at index:', index);
}

// Function to toggle todo completion status
function toggleTodoStatus(index) {
    if (typeof todos[index] === 'undefined') return;
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
    console.log('Schedule status toggled at index:', index);
}

// Function to filter todos
function filterTodo(status) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const filteredTodos = status === 'all' 
        ? todos 
        : todos.filter(todo => status === 'completed' ? todo.completed : !todo.completed);

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">No schedules available...</li>';
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const actualIndex = todos.indexOf(todo); // Get the actual index from the main todos array
        todoList.innerHTML += `<li>
            <span class="${todo.completed ? 'completed' : ''}">${todo.task} - Due: ${todo.dueDate}</span>
            <div class="button-group">
                <button onclick="toggleTodoStatus(${actualIndex})" class="toggle-btn" title="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                    ${todo.completed ? '↩' : '✓'}
                </button>
                <button onclick="deleteTodo(${actualIndex})" class="delete-btn" title="Delete">🗑️</button>
            </div>
        </li>`;
    });
}

/// Function to add a new todo item
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('due-date').value;

    if (!validateForm(todoInput, todoDate)) {
        alert('Please fill in all fields.');
    } else {

        console.log('Schedule Added:', todoInput, 'Due date:', todoDate);
  
        todos.push({
            task: todoInput,
            dueDate: todoDate,
            completed: false
        });

        saveTodos();
        renderTodos('all');

        console.log('Current Schedule: ', todos);
        alert('Schedule added successfully!');

        // Clear input fields after adding
        document.getElementById('todo-input').value = '';
        document.getElementById('due-date').value = '';
    }
}

// Save todos to localStorage
function saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
        console.error('Failed to save todos to localStorage', e);
    }
}

// Load todos from localStorage
function loadTodos() {
    try {
        const raw = localStorage.getItem('todos');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            // Ensure each todo has the expected properties and sane defaults
            todos = parsed.map(t => ({
                task: t.task || '',
                dueDate: t.dueDate || '',
                completed: !!t.completed
            }));
        }
    } catch (e) {
        console.error('Failed to load todos from localStorage', e);
    }
}

function renderTodos(status = 'all') {
    // Update filter buttons active state
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
        if (button.textContent.toLowerCase() === status) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Call the filter function to update the display
    filterTodo(status);
}

// Load saved todos and render when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodos('all');
});
