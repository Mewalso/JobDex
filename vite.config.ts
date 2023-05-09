import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
  ],
  base: './',
  server: {
    port: 4444,
    host: true,
    hmr: true,
    proxy: {
      '/users': {
        target: 'http://localhost:6666',
        changeOrigin: true,
      },
    },
  },
});
