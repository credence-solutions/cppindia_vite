/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Vue-specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
    // General rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}
