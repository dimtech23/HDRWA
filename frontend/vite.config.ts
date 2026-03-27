import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const appBase = env.VITE_APP_BASE || '/'

  return {
    base: appBase,
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
  }
})
