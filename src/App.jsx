// src/App.jsx
// 主应用组件 - 管理整个待办事项应用的状态和逻辑
import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function App() {
  // 项目列表，初始有一个项目 Today
  const [projects, setProjects] = useState([{ id: 1, name: "Today" }]);
  // 当前选中的项目 id，默认选中 Today
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  // 所有任务
  const [todos, setTodos] = useState([]);
  // 新项目输入框内容
  const [newProjectName, setNewProjectName] = useState("");
  // 新任务输入框内容
  const [newTodoText, setNewTodoText] = useState("");

  /**
   * 添加新项目
   * @param {string} projectName - 新项目名称
   */
  const addProject = (projectName) => {
    if (!projectName.trim()) return;
    if (projects.some((p) => p.name === projectName)) return;
    // id 自增，取当前最大 id + 1
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = { id: newId, name: projectName };
    setProjects([...projects, newProject]);
    setNewProjectName("");
  };

  /**
   * 添加新任务
   * @param {string} text - 任务内容
   */
  const addTodo = () => {
    if (!newTodoText.trim()) return;
    if (!selectedProjectId) return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      projectId: selectedProjectId,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  /**
   * 切换任务完成状态
   */
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  /**
   * 删除任务
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 当前选中项目对象
  const currentProject = projects.find(p => p.id === selectedProjectId);
  // 当前项目下的任务
  const currentProjectTodos = todos.filter(todo => todo.projectId === selectedProjectId);

  return (
    <div className="min-h-screen h-screen w-screen bg-gradient-to-br from-blue-100 to-white flex items-stretch justify-stretch">
      <div className="flex flex-row w-full h-full">
        {/* 左侧项目列表 */}
        <div className="flex-[0_0_35%] max-w-[25%] bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">项目</h2>
          <ul className="flex-1 overflow-y-auto mb-4 space-y-1">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition font-medium text-gray-700 ${
                    selectedProjectId === project.id
                      ? "bg-blue-500 text-white shadow"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {project.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-auto">
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-2 py-1 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="新项目名称"
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addProject(newProjectName); }}
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
              onClick={() => addProject(newProjectName)}
            >
              添加
            </button>
          </div>
        </div>

        {/* 右侧任务区 */}
        <div className="flex-1 flex flex-col p-10 overflow-y-auto min-w-0">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center tracking-wide">
            {currentProject ? currentProject.name : "未选择项目"}
          </h1>
          {/* 新任务输入框 */}
          <TodoInput
            value={newTodoText}
            onChange={setNewTodoText}
            onAdd={addTodo}
          />
          {/* 任务列表 */}
          <TodoList
            todos={currentProjectTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
