import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./'), // src 디렉토리를 기준으로 @ 별칭 설정
    },
  },
});
