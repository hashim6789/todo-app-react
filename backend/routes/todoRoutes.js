const { Router } = require("express");
const TodoControllers = require("../controllers/todoController");

const todoRouter = Router();

const todoController = new TodoControllers();

todoRouter.get("/", todoController.getTodos);
todoRouter.post("/", todoController.create);
todoRouter.patch("/:id/complete", todoController.updateStatus);
todoRouter.patch("/:id", todoController.updateTitle);
todoRouter.delete("/:id", todoController.deleteTodo);

module.exports = todoRouter;
