// @ts-check
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server', // REQUIRED for workerEntryPoint & SSR

  adapter: cloudflare({
    workerEntryPoint: {
      path: 'src/worker.ts',
      namedExports: ['MyDurableObject']
    }
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
