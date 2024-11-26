import tailwindConfig from '@daeng-ggu/tailwind-config/tailwind.config';
import path from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    path.join(path.dirname(require.resolve('@daeng-ggu/design-system')), './components/**/*.{js,ts,jsx,tsx}'),
  ],
};
