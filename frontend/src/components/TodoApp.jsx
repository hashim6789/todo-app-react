import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const TodoApp = () => {
  console.log("rendered component");

  //state variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  //for fetching the data from the server
  // Fetch todos only when they are not already loaded
  useEffect(() => {
    if (todos.length === 0) {
      const fetchTodos = async () => {
        try {
          const response = await axios.get("http://localhost:3000/todo");
          console.log(response.data);
          setTodos(response.data.data.todos);
        } catch (err) {
          console.error(err);
        }
      };

      fetchTodos();
    }
  }, [todos.length]); // Only fetch todos if the state is empty

  //for toggle the todo like completed or not completed
  const toggleTodo = (id, isCompleted) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);

    const toggle = async () => {
      const response = await axios.patch(
        `http://localhost:3000/todo/${id}/complete`,
        {
          completed: !isCompleted,
        }
      );
    };
    toggle();
  };

  //for creating a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const response = await axios.post("http://localhost:3000/todo", {
      title: newTodo,
    });

    if (response.data.data.createdTodo) {
      const todo = response.data.data.createdTodo;
      setTodos([...todos, { id: todo.id, title: newTodo, isCompleted: false }]);
    }
    setNewTodo("");
  };

  //for deleting a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => id !== todo.id));

    const deleted = async () => {
      const response = await axios.delete(`http://localhost:3000/todo/${id}`);
    };
    deleted();
  };

  //editing a todo by id
  const startEditing = (id, title) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTitle } : todo
      )
    );

    setEditingId(null);

    const edit = async () => {
      const response = await axios.patch(`http://localhost:3000/todo/${id}`, {
        title: editTitle,
      });
    };
    edit();
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">My Todo List</h1>

      <form onSubmit={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTodo}
          placeholder="Add a new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
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
              .filter((todo) => !todo.isCompleted)
              .map((todo) => (
                <div
                  key={todo.id}
                  // id={todo.id}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id, todo.isCompleted)}
                    className="w-4 h-4 rounded-full"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => saveEdit(todo.id)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                      className="flex-1 px-2 py-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1">{todo.title}</span>
                  )}
                  <button
                    className="p-1 text-green-500 hover:text-green-600"
                    onClick={() => startEditing(todo.id, todo.title)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="p-1 text-red-500 hover:text-red-600"
                    onClick={() => deleteTodo(todo.id)}
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
              .filter((todo) => todo.isCompleted)
              .map((todo) => (
                <div key={todo.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id, todo.isCompleted)}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="flex-1 line-through text-gray-500">
                    {todo.title}
                  </span>
                  <button
                    onClick={() => startEditing(todo.id, todo.title)}
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

export default TodoApp;
