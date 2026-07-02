import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The GitHub Pages repo sub-path. Every asset href in dist/index.html
// will be prefixed with this so they resolve correctly under
// https://worksarvesh.github.io/Portfolio_Worksarvesh/
export default defineConfig({
  base: '/Portfolio_Worksarvesh/',
  plugins: [react(), tailwindcss()],
})
