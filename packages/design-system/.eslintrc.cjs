import tseslint from 'typescript-eslint';

export default tseslint.config({ ignores: ['dist'] }, { extends: ['@daeng-ggu/eslint-config/index.js'] });
