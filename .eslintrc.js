module.exports = {
  parser: "@typescript-eslint/parser", // specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // allows for the parsing of modern ECMAScript features
    sourceType: "module", // allows for the use of imports
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // typescript
    "prettier/@typescript-eslint", // prettier
    "plugin:react/recommended" // react
  ],
  plugins: ["react-hooks", "import"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "no-console": "error",
    "no-alert": "error",
    "import/no-cycle": "error",
    "react/display-name": 0,
    "react/prop-types": 0, // typescript instead
    "@typescript-eslint/no-var-requires": 0, // images
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/consistent-type-assertions": 0, // TODO: figure out why ci fails because of this
    "react-hooks/rules-of-hooks": "error", // hooks
    "react-hooks/exhaustive-deps": "error" // hooks
  }
};
