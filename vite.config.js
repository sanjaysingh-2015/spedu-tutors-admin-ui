import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ✅ your React dev port (can be 5173/5174)
    proxy: {
      // ✅ any request starting with /gateway-api will be forwarded to backend
      "/admin-api": {
        target: "http://localhost:8081", // your Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

