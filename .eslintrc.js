module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 8,
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  // to enable features such as async/await
  ignorePatterns: ["node_modules/*", ".next/*", ".out/*", "!.prettierrc.js", "cypress/*"],
  // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["eslint:recommended", "plugin:storybook/recommended", "plugin:@next/next/recommended"],
  overrides: [// This configuration will apply only to TypeScript files
  {
    plugins: ["@typescript-eslint"],
    files: ["**/*.ts", "**/*.tsx", "**/*.mdx"],
    parser: "@typescript-eslint/parser",
    settings: {
      react: {
        version: "detect"
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    env: {
      browser: true,
      node: true,
      es6: true
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended", // TypeScript rules
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:prettier/recommended", // Prettier recommended rules
    ],
    rules: {
      // We will use TypeScript's types for component props instead
      "react/prop-types": "off",
      // No need to import React when using Next.js
      "react/react-in-jsx-scope": "off",
      // This rule is not compatible with Next.js's <Link /> components
      "jsx-a11y/anchor-is-valid": "off",
      // Why would you want unused vars?
      "@typescript-eslint/no-unused-vars": ["error"],
      // I suggest this setting for requiring return types on functions only where useful
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true
      }],
      "prettier/prettier": ["error", {}, {
        usePrettierrc: true
      }]
    }
  }]
};