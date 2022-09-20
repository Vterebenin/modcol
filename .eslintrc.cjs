/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-debugger': 'off', // switch on for production
        indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'vue/multi-word-component-names': 0,
    },
};
