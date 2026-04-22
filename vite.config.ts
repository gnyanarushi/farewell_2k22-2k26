import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('thumb')) {
          return new URLSearchParams({
            format: 'webp',
            w: '600',
            quality: '72',
            effort: '4',
          })
        }
        if (url.searchParams.has('full')) {
          return new URLSearchParams({
            format: 'webp',
            w: '1600',
            quality: '82',
            effort: '4',
          })
        }
        return new URLSearchParams()
      },
    }),
  ],
})
