import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path"
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  server: {
    host: true
  },
  plugins: [
    vue(),
    vueJsx()
  ],
})
