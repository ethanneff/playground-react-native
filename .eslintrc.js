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
    "eslint:recommended", // eslint
    "plugin:react/recommended", // react
    "plugin:jest/recommended", // jest
    "plugin:@typescript-eslint/recommended", // typescript
    "prettier/@typescript-eslint" // prettier
  ],
  globals: {
    process: true, // process.env.JEST_WORKER_ID
    __DEV__: true
  },
  env: {
    browser: true, // window, setTimeout
    es6: true // Promise
  },
  plugins: ["react-hooks", "import", "jest"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "for-direction": "error",
    "getter-return": "error",
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-console": "error", // no console
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-parens": "error",
    "no-extra-semi": "error",
    "no-func-assign": "error",
    "no-import-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-misleading-character-class": "error",
    "no-obj-calls": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "require-atomic-updates": "error",
    "use-isnan": "error",
    "valid-typeof": "error",
    "jest/no-disabled-tests": "error",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "error",
    "jest/valid-expect": "error",

    "init-declarations": "error",
    "no-delete-var": "error",
    "no-label-var": "error",
    "no-restricted-globals": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-undefined": "off", // used for blank onPress
    "no-unused-vars": "error",
    "no-use-before-define": "error",

    "accessor-pairs": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "class-methods-use-this": "error",
    "consistent-return": "error",
    "default-case": "error",
    "default-param-last": "off", // typescript allows default params
    "dot-location": "error",
    "dot-notation": "error",
    "guard-for-in": "error",
    "max-classes-per-file": "error",
    "no-alert": "error", // no alerts
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-empty-pattern": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-global-assign": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "off", // does not work with react
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-magic-numbers": "off", // too many
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-redeclare": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-warning-comments": "warn", // show todos
    "no-with": "error",
    "prefer-named-capture-group": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": "error",
    "require-await": "error",
    "require-unicode-regexp": "error",
    "vars-on-top": "error",
    "wrap-iife": "error",

    radix: "error",
    yoda: "error",
    eqeqeq: "error",
    curly: "error",
    complexity: "error",
    strict: "error",

    // "import/no-cycle": "error", // no circular dependencies // TODO: re-enable but prevent `parseForESLint` from `yarn lint`
    "react/display-name": "off", // breaks with react.memo
    "react/prop-types": "off", // typescript instead
    "@typescript-eslint/no-var-requires": "off", // react-native images
    "@typescript-eslint/explicit-function-return-type": "off", // good, but too many warnings
    "@typescript-eslint/ban-ts-ignore": "warn", // allow some overrides
    "react-hooks/rules-of-hooks": "error", // hooks
    "react-hooks/exhaustive-deps": "error", // hooks
    "dot-location": ["error", "property"] // web
  }
};
