// src/components/TodoList.jsx
import React from "react";

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white p-2 rounded shadow"
        >
          {/* 🟡 复选框区域 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)} // 触发状态切换
            />
            <span
              className={`${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
          </div>

          {/* 🔴 删除按钮 */}
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
