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
  base: "./",
  // testing configuration
  test: {
    globals: true,
    environment: "happy-dom",  // happy-dom  jsdom  node
    setupFiles: "./test/setup.js",
    css: true,
    coverage: {
      provider: "istanbul", //c8 v8
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/electron/",
      ],
    },
  },
})
