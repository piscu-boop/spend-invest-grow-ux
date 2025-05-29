import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Asegúrate de que sea '/' para dominios personalizados
  plugins: [react()],
  build: {
    outDir: 'docs', // Carpeta de salida para GitHub Pages
    emptyOutDir: true, // Limpia la carpeta de salida antes de construir
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true, // Abre automáticamente el navegador en desarrollo
  },
});
