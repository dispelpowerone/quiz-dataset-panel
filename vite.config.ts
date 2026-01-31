import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false,
    host: true // ensures it listens on the network IP
  },
  plugins: [react()],
})
