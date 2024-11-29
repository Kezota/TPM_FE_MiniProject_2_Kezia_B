document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".input-field input");
  const addButton = document.querySelector(".input-field button");
  const todosList = document.querySelector(".todos");

  // Load todos from local storage
  loadTodos();

  addButton.addEventListener("click", () => {
    addTodoFromInput();
  });

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTodoFromInput();
    }
  });

  function addTodoFromInput() {
    const taskText = inputField.value.trim();
    if (taskText !== "") {
      addTodo(taskText);
      inputField.value = "";
      saveTodos();
    }
  }

  function addTodo(taskText, completed = false) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo");

    todoItem.innerHTML = `
      <div class="content">
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span class="${completed ? "completed" : ""}">${taskText}</span>
      </div>
      <button>
        <img src="assets/cross.svg" alt="Delete">
      </button>
    `;

    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    const deleteButton = todoItem.querySelector("button");
    const span = todoItem.querySelector("span");

    deleteButton.addEventListener("click", () => {
      deleteTodo(todoItem);
      saveTodos();
    });

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        completeTodo(todoItem, span);
      } else {
        span.classList.remove("completed");
        todosList.insertBefore(
          todoItem,
          todosList.querySelector(".todo:not(.completed)")
        );
      }
      saveTodos();
    });

    todosList.insertBefore(todoItem, todosList.firstChild);
  }

  function deleteTodo(todoItem) {
    todosList.removeChild(todoItem);
    saveTodos();
  }

  function completeTodo(todoItem, span) {
    span.classList.add("completed");
    const firstCompletedTodo = todosList.querySelector(".todo.completed");
    if (firstCompletedTodo) {
      todosList.insertBefore(todoItem, firstCompletedTodo);
    } else {
      todosList.appendChild(todoItem);
    }
  }

  function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todos .todo").forEach((todoItem) => {
      const span = todoItem.querySelector("span");
      const checkbox = todoItem.querySelector('input[type="checkbox"]');
      todos.push({
        text: span.textContent,
        completed: checkbox.checked,
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.reverse().forEach((todo) => addTodo(todo.text, todo.completed));
  }
});
