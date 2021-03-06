module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'eqeqeq': 'off'
  },
};
