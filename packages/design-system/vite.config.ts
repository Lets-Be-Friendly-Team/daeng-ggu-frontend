import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // src 디렉토리를 기준으로 @ 별칭 설정
    },
  },
});
