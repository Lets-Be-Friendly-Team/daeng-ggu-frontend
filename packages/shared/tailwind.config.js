import tailwindConfig from '@daeng-ggu/tailwind-config/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: ['./**/*.{js,ts,jsx,tsx}'],
};
