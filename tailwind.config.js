// tailwind.config.js
// Tailwind CSS 配置文件 - 定义 CSS 框架的自定义设置

/** @type {import('tailwindcss').Config} */
export default {
  // 内容配置：指定需要扫描的文件路径，用于生成 CSS
  content: [
    "./index.html", // 扫描 HTML 文件
    "./src/**/*.{js,ts,jsx,tsx}", // 扫描 src 目录下的所有 JavaScript/TypeScript 文件
  ],
  
  // 主题配置：自定义 Tailwind 的设计系统
  theme: {
    extend: {}, // 扩展默认主题（当前为空，使用默认设置）
  },
  
  // 插件配置：添加额外的 Tailwind 插件（当前为空）
  plugins: [],
}

