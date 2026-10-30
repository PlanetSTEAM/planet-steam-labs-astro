import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  site: 'https://planetsteam.github.io',
  base: process.env.LABS_BUILD === '1' ? '/planet-steam-labs-astro/' : '/',
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
