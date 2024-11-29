import { addTodo } from "./todo.js";

export function saveTodos(todosList) {
  const todos = [];
  todosList.querySelectorAll(".todo").forEach((todoItem) => {
    const span = todoItem.querySelector("span");
    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    todos.push({
      text: span.textContent,
      completed: checkbox.checked,
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodos(todosList) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos
    .reverse()
    .forEach((todo) => addTodo(todo.text, todosList, todo.completed));
}
