// @ts-check

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // 1. Add the Cloudflare adapter with Durable Object config
  adapter: cloudflare({
    workerEntryPoint: {
      path: 'src/worker.ts',
      namedExports: ['MyDurableObject']
    }
  }),

  // 2. Keep your existing Vite/Tailwind config
  vite: {
    plugins: [tailwindcss()],
  },

  // 3. Keep your existing React integration
  integrations: [react()],
});