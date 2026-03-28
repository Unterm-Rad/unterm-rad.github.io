import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// vite.config.js
export default defineConfig({
  base: '/', // 个人主页仓库必须设置为 '/'
  plugins: [
    react(),
    tailwindcss(),
  ],
})