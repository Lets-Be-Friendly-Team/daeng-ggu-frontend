import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff2'],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
