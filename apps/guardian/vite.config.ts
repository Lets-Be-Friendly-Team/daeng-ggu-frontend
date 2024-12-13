import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 5175,
  },
  assetsInclude: ['**/*.woff2'],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
