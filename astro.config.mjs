import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: 'uo0tfzx3',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-10-15',
    studioBasePath: '/studio',
  }), react(), tailwind()],
});