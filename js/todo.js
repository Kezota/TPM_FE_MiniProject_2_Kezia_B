import { saveTodos } from "./storage.js";

export function addTodo(taskText, todosList, completed = false) {
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
    deleteTodo(todoItem, todosList);
    saveTodos(todosList);
  });

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      completeTodo(todoItem, span, todosList);
    } else {
      span.classList.remove("completed");
      todosList.insertBefore(
        todoItem,
        todosList.querySelector(".todo:not(.completed)")
      );
    }
    saveTodos(todosList);
  });

  todosList.insertBefore(todoItem, todosList.firstChild);
}

function deleteTodo(todoItem, todosList) {
  todosList.removeChild(todoItem);
}

function completeTodo(todoItem, span, todosList) {
  span.classList.add("completed");
  const firstCompletedTodo = todosList.querySelector(".todo.completed");
  if (firstCompletedTodo) {
    todosList.insertBefore(todoItem, firstCompletedTodo);
  } else {
    todosList.appendChild(todoItem);
  }
}
