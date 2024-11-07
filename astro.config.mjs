import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'uo0tfzx3',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-11-06',
      studioBasePath: '/studio',
    }), 
    react(), 
    tailwind()
  ],
  output: 'server',
  adapter: netlify(),
  image: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sanity.io'
      }
    ]
  }
});