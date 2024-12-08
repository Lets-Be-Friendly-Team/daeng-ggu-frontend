import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ['**/*.woff2'],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
