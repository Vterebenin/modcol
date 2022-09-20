import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const BASE = {
    external: ['lodash'],
    plugins: [],
    input: 'src/index.js',
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    test: {
        globals: true,
    },
    build: {
        rollupOptions: BASE,
    },
});
