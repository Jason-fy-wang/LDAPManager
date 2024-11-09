import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path"


export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  server: {
    host: true
  },
  plugins: [vue()],
})
