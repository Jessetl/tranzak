import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tailwindReferenceInjector } from './vite-plugins/tailwindReferenceInjector';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindReferenceInjector(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
});
