const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const globals = require("globals");

module.exports = tseslint.config(
    {
        ignores: [
            "dist",
            "node_modules",
            "src/generated",
            "*.config.js",
            "eslint.config.js",
            "prisma.config.js"
        ],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ["**/*.ts"],

        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
            },

            globals: {
                ...globals.node,
            },
        },

        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
        },
    }
);