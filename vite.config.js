import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            babel: {
                plugins: [
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                ],
            },
        }),
    ],
    test: {
        globals: true,
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'modcol',
            // the proper extensions will be added
            fileName: 'modcol',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            input: 'src/index.js',
            external: ['lodash'],
        },
    },
});
