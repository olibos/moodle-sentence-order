import { defineConfig } from 'vite'

export default defineConfig({
    base: './',
    publicDir: 'public',
    build: {
        emptyOutDir: true,
        minify: true,
        rollupOptions: {
            output: {
                entryFileNames: `moodle-sentence-order.js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    }
})
