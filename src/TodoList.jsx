// 展示所有 todos 的列表
export default function TodoList({ todos }) {
    return (
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="p-2 border-b">
            {todo}
          </li>
        ))}
      </ul>
    );
  }
  