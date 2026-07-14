import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    // Gzip compression for production builds
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],

  resolve: {
    alias: {
      // @ maps to src/ — use in all imports
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Auto-import SCSS variables & mixins in every component
        // Using @import (legacy but simpler cascade — avoids @use module scoping issues)
        additionalData: `
          @import "@/styles/base/variables";
          @import "@/styles/base/mixins";
        `,
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
    },
  },

  build: {
    // Target modern browsers for smaller bundle size
    target: 'es2020',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-gsap': ['gsap'],
          'vendor-swiper': ['swiper'],
          'vendor-vueuse': ['@vueuse/core'],
          'vendor-axios': ['axios'],
        },
      },
    },
    // Warn when chunk exceeds 500kb
    chunkSizeWarningLimit: 500,
  },

  server: {
    port: 5173,
    open: true,
  },
})
