import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Windows briefly locks freshly-copied files (e.g. photos dropped into public/images);
// chokidar's fs.watch then throws EBUSY, which otherwise crashes the whole dev server.
// Swallow just that error instead of excluding the folder from watching (that would also
// disable static serving of files in it).
function ignoreWatcherEbusy() {
  return {
    name: 'ignore-watcher-ebusy',
    configureServer(server) {
      server.watcher.on('error', (err) => {
        if (err && err.code === 'EBUSY') return
        throw err
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ignoreWatcherEbusy()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: [
        '**/*.zip',
        '**/New folder/**',
        '**/design_handoff_*/**',
      ],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
})
