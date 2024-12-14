import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: newTodo,
        isCompleted: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id, isCompleted) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTitle } : todo
      )
    );
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          My Todo List
        </h1>

        <form onSubmit={addTodo} className="mb-8 flex gap-3">
          <input
            type="text"
            value={newTodo}
            placeholder="Add a new todo..."
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Todo
          </button>
        </form>

        <div className="space-y-8">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Pending Tasks
            </h2>
            <div className="space-y-3">
              {todos
                .filter((todo) => !todo.isCompleted)
                .map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleTodo(todo.id, todo.isCompleted)}
                      className="w-5 h-5 rounded-full border-2 border-gray-300 text-green-500 focus:ring-green-500 transition-all cursor-pointer"
                    />
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => saveEdit(todo.id)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && saveEdit(todo.id)
                        }
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        autoFocus
                      />
                    ) : (
                      <span className="flex-1 text-gray-700">{todo.title}</span>
                    )}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        onClick={() => startEditing(todo.id, todo.title)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Completed Tasks
            </h2>
            <div className="space-y-3">
              {todos
                .filter((todo) => todo.isCompleted)
                .map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleTodo(todo.id, todo.isCompleted)}
                      className="w-5 h-5 rounded-full border-2 border-gray-300 text-green-500 focus:ring-green-500 transition-all cursor-pointer"
                    />
                    <span className="flex-1 line-through text-gray-400">
                      {todo.title}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        onClick={() => startEditing(todo.id, todo.title)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
