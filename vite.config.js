import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  proxy: {
    // Configuration du proxy pour votre API
    '/api': {
      target: 'https://api.cosit-togo.com/api/',
      changeOrigin: true,
      secure: false, // Si votre API utilise un certificat SSL auto-signé, mettez cette option à false
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
