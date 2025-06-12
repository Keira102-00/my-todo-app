import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (text) => {
    setTodos([...todos, text]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">我的待办事项</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
