import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/wasm': path.resolve(__dirname, './wasm'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [react()],
})
