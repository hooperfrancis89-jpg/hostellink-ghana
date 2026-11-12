import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' lets the built site work on GitHub Pages sub-paths and static hosts.
export default defineConfig({
  plugins: [react()],
  base: './',
  test: { environment: 'node' },
})
