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
  safelist: [
    'slide-up-enter',
    'slide-up-enter-active',
    'slide-up-exit',
    'slide-up-exit-active',
    'slide-forward-enter',
    'slide-forward-enter-active',
    'slide-forward-exit',
    'slide-forward-exit-active',
    'slide-backward-enter',
    'slide-backward-enter-active',
    'slide-backward-exit',
    'slide-backward-exit-active',
  ],
};
