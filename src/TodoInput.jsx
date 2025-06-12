// 输入框组件，输入内容后点击按钮将任务传给父组件
import { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入你的待办事项"
        className="border p-2 flex-1 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        添加
      </button>
    </form>
  );
}
