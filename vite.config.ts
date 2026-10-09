import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Serves the Express API from the Vite dev server, so front and API share one port
function api(): Plugin {
  return {
    name: 'api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) return next()
        const { app } = await server.ssrLoadModule('/server/index.ts')
        app(req, res, next)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), api()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
