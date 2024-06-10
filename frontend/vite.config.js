import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:6000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    // exclude: ['**/*.css'] // Exclude CSS files from being processed by Rollup
  }
})
