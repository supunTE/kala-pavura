const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: [
    "only-warn",
    "sort-exports",
    "simple-import-sort",
    "unused-imports",
    "jsx-a11y",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      rules: {
        "no-lonely-if": "error",
        curly: ["error", "multi-line"],
        "unused-imports/no-unused-imports": "error",
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
          },
        ],
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages
              ["^react", "^@", "^\\w"],

              // Kala-Pavura modules
              ["^@kala-pavura"],

              // Next absolute imports.
              ["^@/"],

              // Side effect imports.
              ["^\\u0000"],

              // parent imports. (`../../file`),
              // sibling imports (`..` or `../`)
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

              // Relative imports:
              // subdirectories (./folder/file),
              // hidden directories (.folder/file) or hidden files (.file),
              // current directory (. or ./)
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

              // Style imports.
              ["^.+\\.?(css|scss)$"],
            ],
          },
        ],
      },
    },
    {
      files: ["*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx"],
      env: {
        jest: true,
      },
      rules: {},
    },
  ],
};
