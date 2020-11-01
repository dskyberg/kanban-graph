module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "settings": {
        "react": {
          "version": "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars-experimental": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": 0,
        "allowTypedFunctionExpressions": 0
    }
};
