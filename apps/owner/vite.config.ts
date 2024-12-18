import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), mkcert()],
  assetsInclude: ['**/*.woff2'],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
});
