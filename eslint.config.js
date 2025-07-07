// eslint.config.js
// ESLint 配置文件 - 定义代码质量检查和格式化规则

// 导入 ESLint 的核心 JavaScript 规则
import js from '@eslint/js'

// 导入全局变量定义
import globals from 'globals'

// 导入 React Hooks 的 ESLint 插件
import reactHooks from 'eslint-plugin-react-hooks'

// 导入 React 热重载的 ESLint 插件
import reactRefresh from 'eslint-plugin-react-refresh'

// 导出 ESLint 配置数组
export default [
  // 全局忽略配置：忽略 dist 目录
  { ignores: ['dist'] },
  
  // 主要配置对象：适用于所有 JavaScript 和 JSX 文件
  {
    // 文件匹配模式
    files: ['**/*.{js,jsx}'],
    
    // 语言选项配置
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 版本
      globals: globals.browser, // 浏览器全局变量
      parserOptions: {
        ecmaVersion: 'latest', // 使用最新的 ECMAScript 特性
        ecmaFeatures: { jsx: true }, // 启用 JSX 支持
        sourceType: 'module', // 使用 ES 模块语法
      },
    },
    
    // 插件配置
    plugins: {
      'react-hooks': reactHooks, // React Hooks 规则插件
      'react-refresh': reactRefresh, // React 热重载规则插件
    },
    
    // 规则配置
    rules: {
      ...js.configs.recommended.rules, // 继承推荐的 JavaScript 规则
      ...reactHooks.configs.recommended.rules, // 继承推荐的 React Hooks 规则
      
      // 自定义规则
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // 未使用变量检查，忽略大写字母开头的变量
      'react-refresh/only-export-components': [
        'warn', // 警告级别
        { allowConstantExport: true }, // 允许常量导出
      ],
    },
  },
]
