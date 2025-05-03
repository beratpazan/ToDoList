const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const prioritySelect = document.getElementById("priority-select");
const filterSelect = document.getElementById("filter-select");
const themeToggle = document.getElementById("toggle-theme");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateStats() {
    totalCount.textContent = todos.length;
    completedCount.textContent = todos.filter(todo => todo.completed).length;
}

function renderTodos() {
    todoList.innerHTML = "";
    const filter = filterSelect.value;

    todos
        .filter(todo =>
            filter === "all" ||
            (filter === "completed" && todo.completed) ||
            (filter === "uncompleted" && !todo.completed)
        )
        .forEach((todo, index) => {
            const li = document.createElement("li");
            li.classList.add(`priority-${todo.priority}`);
            if (todo.completed) li.classList.add("completed");

            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button onclick="toggleComplete(${index})">✔</button>
                    <button onclick="deleteTodo(${index})">🗑</button>
                </div>
            `;

            todoList.appendChild(li);
        });

    updateStats();
    saveTodos();
}

function addTodo() {
    const text = input.value.trim();
    const priority = prioritySelect.value;

    if (text === "") return;

    todos.push({ text, completed: false, priority });
    input.value = "";
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

addBtn.addEventListener("click", addTodo);
filterSelect.addEventListener("change", renderTodos);
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

renderTodos();
