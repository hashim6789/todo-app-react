const Todo = require("../models/Todo");
const TodoList = require("../models/TodoList");

class TodoService {
  constructor() {
    this.todoList = new TodoList();
  }

  // Add a new todo
  createTodo(title) {
    const id = this.todoList.getKey() + 1; // Generate a new unique ID
    const todo = new Todo(id, title);
    return this.todoList.addTodo(todo);
  }

  // Mark a todo as completed by ID
  markTodoCompleted(id) {
    this.todoList.completeTodoById(id);
    return this.getTodoById(id);
  }

  // Mark a todo as not completed by ID
  markTodoNotCompleted(id) {
    this.todoList.notCompleteTodoById(id);
    return this.getTodoById(id);
  }

  // Get all todos
  getAllTodos() {
    return this.todoList.getTodos();
  }

  // Get a todo by ID
  getTodoById(id) {
    return this.todoList.todos[id] || null; // Return null if the todo doesn't exist
  }

  // Get all pending todos
  getPendingTodos() {
    return this.todoList.getPendingTodos();
  }

  // Get all completed todos
  getCompletedTodos() {
    return this.todoList.getCompletedTodos();
  }

  // Update the title of a todo by ID
  updateTodoTitle(id, newTitle) {
    return this.todoList.updateTitle(id, newTitle);
  }

  // Delete a todo by ID
  deleteTodoById(id) {
    return this.todoList.deleteTodo(id);
  }
}

module.exports = TodoService;
