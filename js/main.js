import { addTodo } from "./todo.js";
import { loadTodos, saveTodos } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".input-field input");
  const addButton = document.querySelector(".input-field button");
  const todosList = document.querySelector(".todos");

  // Load todos from local storage
  loadTodos(todosList);

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
      addTodo(taskText, todosList);
      inputField.value = "";
      saveTodos(todosList);
    }
  }
});
