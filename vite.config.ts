import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true,
        host: true,
        port: 8080,
        
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp'
        },
    },

    plugins: [
        vue(),
    ],
    
    optimizeDeps: {
        exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
    },

    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
