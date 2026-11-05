import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'assets-case-middleware',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url) {
            req.url = req.url
              .replace(/^\/assets\//i, '/Assets/')
              .replace(/\/mascot\//i, '/Mascot/')
              .replace(/\/props\//i, '/Props/');
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url) {
            req.url = req.url
              .replace(/^\/assets\//i, '/Assets/')
              .replace(/\/mascot\//i, '/Mascot/')
              .replace(/\/props\//i, '/Props/');
          }
          next();
        });
      }
    },
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'audio/**/*.mp3', 'fonts/**/*'],
      manifest: {
        name: 'Floor Trainer - Ather Energy',
        short_name: 'FloorTrainer',
        description: 'Interactive warehouse floor training for blue-collar staff at Ather Energy',
        theme_color: '#14232b',
        background_color: '#dfe5e8',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff2,json}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'audio',
            handler: 'CacheFirst',
            options: {
              cacheName: 'voiceover-audio-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
})
