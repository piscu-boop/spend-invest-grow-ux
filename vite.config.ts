
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path when served on GitHub Pages
  base: '/',

  plugins: [
    react(), // React support
  ],

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
})
