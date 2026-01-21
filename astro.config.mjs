import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yoursite.com', // Update ini per project
  integrations: [
    // error  kalo pake ini
    // tailwind({
    //   applyBaseStyles: false, // Karena pakai custom global.css
    // }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});