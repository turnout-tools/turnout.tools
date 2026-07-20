// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [pagefind(), mermaid()],
});

