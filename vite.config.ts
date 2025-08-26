// ✅ ตัวนี้แนะนำ
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import swc from "vite-plugin-swc";

export default defineConfig({
  plugins: [
    vue()
  ],

  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@utils": "/src/shared/utils",
      "@modules": "/src/modules",
      '@shared': '/src/shared',
      "@routes": "/src/router/routes",
    },
  },
});
