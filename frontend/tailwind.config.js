import {postcss} from "autoprefixer";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
      postcss
  ],
  prefix:'tw-',
  corePlugins: {
    preflight: false // <== disable this!
  },
}

