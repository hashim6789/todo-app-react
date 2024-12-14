const TodoService = require("../services/TodoServices");

class TodoController {
  constructor() {
    this.todoService = new TodoService();
    this.getTodos = this.getTodos.bind(this);
    // this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  // For fetching all todos
  getTodos(req, res) {
    try {
      const todos = this.todoService.getAllTodos();
      res.status(200).json({
        success: true,
        message: "The todos are fetched successfully.",
        data: { todos },
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get todos.", error: err });
    }
  }

  // For creating a new todo
  create = (req, res) => {
    try {
      const { title } = req.body;
      const createdTodo = this.todoService.createTodo(title);
      res.status(201).json({
        success: true,
        message: "The todo is created successfully.",
        data: { createdTodo },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error.", error });
    }
  };

  // For updating the status of a todo
  updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      let message;
      if (completed) {
        this.todoService.markTodoCompleted(parseInt(id, 10));
        message = "The todo is changed to completed.";
      } else {
        this.todoService.markTodoNotCompleted(parseInt(id, 10));
        message = "The todo is changed to pending.";
      }

      res.status(200).json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error.", error });
    }
  }

  // For updating the title of a todo
  updateTitle(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const updatedTodo = this.todoService.updateTodoTitle(
        parseInt(id, 10),
        title
      );
      if (updatedTodo) {
        res.status(200).json({
          success: true,
          message: "The todo title is updated.",
          data: { updatedTodo },
        });
      } else {
        res.status(404).json({ success: false, message: "Todo not found." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error.", error });
    }
  }

  // For deleting a todo
  deleteTodo(req, res) {
    try {
      const { id } = req.params;

      const deletedTodo = this.todoService.deleteTodoById(parseInt(id, 10));
      if (deletedTodo) {
        res.status(200).json({
          success: true,
          message: "The todo is deleted.",
          data: { deletedTodo },
        });
      } else {
        res.status(404).json({ success: false, message: "Todo not found." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error.", error });
    }
  }
}

module.exports = TodoController;
