const Todo = require("./Todo");

class TodoList {
  constructor() {
    this.todos = {};
    this.count = 0;
  }

  // For adding a todo into the todos object.
  addTodo(todo) {
    this.todos[todo.getId()] = todo;
    this.count++;
    return this.todos[todo.getId()];
  }

  // For getting the generated key of the corresponding todo for creating the todo with this key.
  getKey() {
    return this.count;
  }

  // For marking the todo as completed from the pending todos.
  completeTodoById(id) {
    const todo = this.todos[id];
    if (todo && !todo.getIsCompleted()) {
      todo.completed();
    }
  }

  // For marking the todo as not completed from the completed todos.
  notCompleteTodoById(id) {
    const todo = this.todos[id];
    if (todo && todo.getIsCompleted()) {
      todo.notCompleted();
    }
  }

  // For getting all existing todos in the todos object as an array for rendering the page.
  getTodos() {
    console.log("Todos =", this.todos);
    return Object.values(this.todos);
  }

  // For getting all pending todos, where isCompleted is false.
  getPendingTodos() {
    return Object.values(this.todos).filter((todo) => !todo.getIsCompleted());
  }

  // For getting all completed todos, where isCompleted is true.
  getCompletedTodos() {
    return Object.values(this.todos).filter((todo) => todo.getIsCompleted());
  }

  // For updating the title of the todo.
  updateTitle(id, newTitle) {
    const todo = this.todos[id];
    if (todo) {
      todo.setTitle(newTitle);
    }
    return todo;
  }

  // For deleting the todo.
  deleteTodo(id) {
    const deletedTodo = this.todos[id];
    if (deletedTodo) {
      delete this.todos[id];
    }
    return deletedTodo;
  }
}

module.exports = TodoList;
