import { fileURLToPath, URL } from "node:url";
import pkg from "./package.json";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const BASE = {
  external: ["lodash"],
  plugins: [],
  input: "src/index.js",
  output: [
    { file: pkg.main, format: "js" },
    { file: pkg.module, format: "es" },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: BASE,
  },
});
