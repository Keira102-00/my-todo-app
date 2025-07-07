// src/TodoList.jsx
// 任务列表组件，只负责渲染任务列表
import React from 'react';

/**
 * @param {Array} todos - 当前项目下的任务数组
 * @param {function} toggleTodo - 切换任务完成状态
 * @param {function} deleteTodo - 删除任务
 */
export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 bg-white rounded-lg shadow-inner p-2">
      {todos.length === 0 && (
        <li className="text-gray-400 text-center py-10 select-none">暂无任务</li>
      )}
      {todos.map(todo => (
        <li key={todo.id} className="flex items-center justify-between py-3 px-2 group">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="accent-blue-500 w-5 h-5"
            />
            <span className={todo.completed ? "line-through text-gray-400" : "text-gray-800"}>{todo.text}</span>
          </div>
          <button
            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
            onClick={() => deleteTodo(todo.id)}
            title="删除"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
