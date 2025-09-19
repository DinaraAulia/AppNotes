// eslint.config.js
import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintImport from 'eslint-plugin-import';
import globals from 'globals';

export default [
  // ESLint's recommended rules
  eslint.configs.recommended,

  // Configuration for React files
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    // The corrected plugins object
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: eslintImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Menambahkan aturan untuk mengabaikan unused-vars
      'no-unused-vars': 'off', 
      
      // React rules
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'error',
      'react/function-component-definition': ['error', {
        'namedComponents': 'arrow-function',
        'unnamedComponents': 'arrow-function',
      }],
      'react/no-unstable-nested-components': ['warn', { 'allowAsProps': true }],
      
      // Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility and Import rules
      'jsx-a11y/anchor-is-valid': 'off',
      'import/no-unresolved': 'off',
      
      // Style rules
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'space-in-parens': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  
  // Ignore files and folders
  {
    ignores: ["dist/", "node_modules/"],
  },
];