// src/TodoInput.jsx
// 任务输入组件，只负责输入和添加任务
import React from 'react';

/**
 * @param {string} value - 输入框内容
 * @param {function} onChange - 输入框内容变化时的回调
 * @param {function} onAdd - 点击添加按钮或回车时的回调
 */
export default function TodoInput({ value, onChange, onAdd }) {
  return (
    <div className="flex gap-2 mb-6 justify-center">
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-3 py-2 flex-1 max-w-xs text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="输入任务内容"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onAdd(); }}
      />
      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-lg text-base hover:bg-blue-600 transition"
        onClick={onAdd}
      >
        添加任务
      </button>
    </div>
  );
}
