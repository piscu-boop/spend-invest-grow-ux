import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
    open: false,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/rendimientos-fci': {
        target: 'https://rendimientos.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rendimientos-fci/, '/api/fci'),
        secure: true,
      },
      '/api/rendimientos': {
        target: 'https://rendimientos.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rendimientos/, '/api/config'),
        secure: true,
      },
    },
    watch: {
      ignored: ['**/docs/**', '**/node_modules/**', '**/.git/**'],
    },
    fs: {
      strict: false,
      deny: ['**/docs/**'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
