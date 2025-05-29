import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Si estás en producción y no usas un subdirectorio, usa '/' como base
  const base = mode === 'production' ? '/' : '/';

  return {
    base,
    plugins: [react()],
    build: {
      // Output the production build to "docs" so GH-Pages can serve it
      outDir: 'docs',
      // Empty the directory on each build
      emptyOutDir: true,
    },
    resolve: {
      // Optional: add path aliases (e.g. import Foo from '@/components/Foo')
      alias: {
        '@': '/src',
      },
    },
    server: {
      // Automatically open browser on `npm run dev`
      open: true,
      // You can customize the port if you like
      // port: 3000,
    },
  };
});
