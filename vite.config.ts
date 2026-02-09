import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginString } from 'vite-plugin-string' // This might not be needed, but let's check imports
// Note: vite-plugin-ssg doesn't need a plugin in vite.config.ts for the basic setup, 
// it primarily works via the `vite-ssg build` command and the entry point.
// However, we need to ensure the build script in package.json is updated.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are relative for easy hosting on GCS
  build: {
    outDir: 'dist',
    assetsDir: 'assets',

  }
})
