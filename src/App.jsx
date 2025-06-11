// 从 React 中导入 useState，这是一个 Hook，用来在函数组件中存储状态
import { useState } from 'react';

function App() {
  // 创建两个状态变量：tasks 用于保存任务列表，input 用于保存输入框内容
  const [tasks, setTasks] = useState([]);     // 初始为空数组
  const [input, setInput] = useState('');     // 初始为空字符串

  // 当点击“添加”按钮时会调用这个函数
  const addTask = () => {
    if (input.trim()) { // 如果输入框不是空的
      // 把当前输入添加到任务列表中，并清空输入框
      setTasks([...tasks, input]); // 扩展已有任务列表
      setInput('');                // 清空输入框
    }
  };

  // 返回要渲染到页面上的 JSX 结构
  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-2xl shadow">
      {/* 标题 */}
      <h1 className="text-2xl font-bold mb-4">📝 我的 Todo App</h1>

      {/* 输入区域 + 按钮 */}
      <div className="flex mb-4">
        {/* 输入框 */}
        <input
          type="text"
          value={input}                         // 输入框的值绑定 input 状态
          onChange={e => setInput(e.target.value)}  // 每次输入内容变化就更新 input
          className="flex-1 border rounded px-2 py-1 mr-2"
          placeholder="输入任务"
        />

        {/* 添加按钮 */}
        <button
          onClick={addTask}                     // 点击时执行 addTask 函数
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          添加
        </button>
      </div>

      {/* 任务列表 */}
      <ul className="list-disc list-inside text-left">
        {/* 遍历 tasks 数组，将每一个任务显示成一个 <li> 元素 */}
        {tasks.map((task, index) => (
          <li key={index} className="mb-1">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 导出 App 组件，让其他文件可以使用
export default App;
