import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), tsconfigPaths()],
  assetsInclude: ['**/*.woff2'],
  server: {
    host: true,
    port: 5174,
  },
  base: '/designer/',
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
