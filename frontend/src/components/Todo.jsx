import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  //   const tasks = [
  //     { id: 1, title: "Complete project documentation", isCompleted: false },
  //     { id: 2, title: "Prepare for the team meeting", isCompleted: false },
  //     { id: 3, title: "Review pull requests", isCompleted: false },
  //     { id: 4, title: "Update project roadmap", isCompleted: false },
  //     { id: 5, title: "Plan sprint retrospective", isCompleted: false },
  //   ];

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">My Todo List</h1>

      <form onSubmit={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-6">
        {/* Pending Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
          <div className="space-y-3">
            {todos
              .filter((todo) => !todo.completed)
              .map((todo) => (
                <div key={todo.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 rounded-full"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(todo.id)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                      className="flex-1 px-2 py-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1">{todo.text}</span>
                  )}
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="p-1 text-green-500 hover:text-green-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
          <div className="space-y-3">
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <div key={todo.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="flex-1 line-through text-gray-500">
                    {todo.text}
                  </span>
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="p-1 text-green-500 hover:text-green-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
