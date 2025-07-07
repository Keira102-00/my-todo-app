// vite.config.js
// Vite 构建工具配置文件 - 定义项目的构建和开发环境设置

// 导入 Vite 的配置定义函数
import { defineConfig } from 'vite'

// 导入 React 插件，用于支持 React 组件的热重载和构建
import react from '@vitejs/plugin-react'

// 导入 PWA 插件
import { VitePWA } from 'vite-plugin-pwa';

// 导出 Vite 配置对象
// 更多配置选项请参考：https://vite.dev/config/
export default defineConfig({
  // 插件配置：使用 React 插件
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '我的任务清单',
        short_name: '任务清单',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        description: '一个简洁的待办事项App',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
