import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress specific warnings
        if (warning.code === 'SOME_WARNING_CODE') return;
        // Use default for everything else
        warn(warning);
      },
    },
  },
});
