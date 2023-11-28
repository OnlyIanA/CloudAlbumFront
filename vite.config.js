import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    host: "0.0.0.0",
    proxy:{
      '/api':{//获取了路径中包含了/api的请求
        target:'http://localhost:8080',//后台服务所在的源
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,''),// /api替换为''
      }
    }
  }
})
