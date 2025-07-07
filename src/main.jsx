// src/main.jsx
// React 应用的入口文件 - 负责启动和渲染整个应用

// 导入 React 的严格模式组件，用于开发时检测潜在问题
import { StrictMode } from 'react'

// 导入 React 18 的新 API，用于创建根节点
import { createRoot } from 'react-dom/client'

// 导入全局样式文件
import './index.css'

// 导入主应用组件
import App from './App.jsx'

// 创建 React 根节点并渲染应用
// document.getElementById('root') 获取 HTML 中的根元素
// createRoot() 创建 React 18 的根节点
// render() 方法渲染应用组件
createRoot(document.getElementById('root')).render(
  // 使用严格模式包装应用，帮助发现潜在问题
  <StrictMode>
    <App />
  </StrictMode>,
)
