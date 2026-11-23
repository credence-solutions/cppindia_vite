import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { spaRoutePaths, pageFiles } from './scripts/spa-routes.js'

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))

// Give every real page its own copy of index.html so GitHub Pages answers 200
// instead of serving it through 404.html (see scripts/spa-routes.js).
function spaPages() {
  return {
    name: 'spa-pages',
    apply: 'build',
    writeBundle({ dir }) {
      const html = readFileSync(join(dir, 'index.html'), 'utf8')
      const paths = spaRoutePaths({
        routerSource: readFileSync(new URL('./src/router/index.js', import.meta.url), 'utf8'),
        speakers: readJson('./src/data/speakers.json'),
        blog: readJson('./src/data/blog.json'),
      })
      for (const file of paths.flatMap(pageFiles)) {
        mkdirSync(dirname(join(dir, file)), { recursive: true })
        writeFileSync(join(dir, file), html)
      }
      this.info(`wrote index.html copies for ${paths.length} routes`)
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',

  plugins: [
    vue(),
    spaPages(),
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
