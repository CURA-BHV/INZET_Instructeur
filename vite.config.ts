import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/Instructeur_Hulpverleners_van_BHVLand/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: [
            'icons/*.png',
            'icons/icon.svg',
          ],
          manifest: {
            name: 'De hulpverleners van BHV land',
            short_name: 'BHV Land',
            description: 'Instructeur dashboard voor het BHV spel',
            start_url: './',
            scope: './',
            display: 'standalone',
            orientation: 'landscape',
            background_color: '#f1f5f9',
            theme_color: '#002b47',
            categories: ['education', 'games'],
            lang: 'nl',
            icons: [
              { src: 'icons/icon-72x72.png', sizes: '72x72', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-96x96.png', sizes: '96x96', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-144x144.png', sizes: '144x144', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-152x152.png', sizes: '152x152', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-384x384.png', sizes: '384x384', type: 'image/png', purpose: 'any maskable' },
              { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
            ],
          },
          workbox: {
            // Cache all static assets for offline use
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
            // Cache-first strategy for all app resources
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'gstatic-fonts-cache',
                  expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
            ],
            // Ensure the SW takes control immediately
            skipWaiting: true,
            clientsClaim: true,
          },
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
          output: {
            manualChunks: undefined
          }
        }
      }
    };
});
