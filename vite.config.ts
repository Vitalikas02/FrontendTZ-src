import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/FrontendTZ-src/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});