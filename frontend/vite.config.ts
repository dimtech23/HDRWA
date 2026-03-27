import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hdrwa/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/hdrwa/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hdrwa/, ''),
      },
    },
  },
})
