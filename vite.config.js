import { fileURLToPath, URL } from "node:url";
// import pkg from "./package.json";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const BASE = {
  external: ["lodash"],
  plugins: [],
  input: "src/index.js",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: BASE,
  },
});
