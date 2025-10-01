import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/crossword/",
  resolve: {
    alias: {
      // Define your aliases here
      '@': resolve(__dirname, 'src'), // Example: '@' maps to the 'src' directory
      // You can add more aliases as needed, e.g., for 'components', 'utils', etc.
      // 'components': resolve(__dirname, 'src/components'),
    },
  },
});
